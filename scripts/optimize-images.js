#!/usr/bin/env node
/**
 * optimize-images.js
 * ------------------
 * Local build-step script for RVS-Agri.
 *
 * What it does:
 *  1. Recursively scans `public/` for PNG / JPEG / JPG files.
 *  2. Skips any file that already has a matching `.webp` sibling with a
 *     newer or equal mtime (so re-runs are fast).
 *  3. For each new/changed source image:
 *       - Produces a compressed original (quality 80) overwriting the source.
 *       - Produces a `.webp` sibling at quality 82.
 *  4. Prints a concise summary with savings per file and overall totals.
 *
 * Requirements (install once):
 *   npm install --save-dev sharp
 *
 * Usage:
 *   node scripts/optimize-images.js            # optimise all images
 *   node scripts/optimize-images.js --dry-run  # show what would be done, no writes
 */

import { readdir, stat, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

// ── Configuration ────────────────────────────────────────────────────────────

const CONFIG = {
  /** Root directory to scan (relative to project root). */
  inputDir: 'public',

  /** JPEG/PNG re-compression quality (1-100). 80 is a good balance. */
  jpegQuality: 80,
  pngQuality: 80,

  /** WebP output quality (1-100). Slightly higher than JPEG because WebP
   *  is more efficient — 82 still beats JPEG 80 in file size. */
  webpQuality: 82,

  /** Files / folders to skip entirely. */
  exclude: ['favicon.ico', 'placeholder.svg'],
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const isDryRun = process.argv.includes('--dry-run')
const isVerbose = process.argv.includes('--verbose')

/** ANSI colour helpers */
const c = {
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  grey:   (s) => `\x1b[90m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
}

function fmtBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}

function fmtSaving(before, after) {
  const saved = before - after
  const pct = ((saved / before) * 100).toFixed(1)
  const arrow = saved >= 0 ? c.green(`-${pct}%`) : c.red(`+${Math.abs(pct)}%`)
  return `${fmtBytes(before)} → ${fmtBytes(after)}  (${arrow})`
}

/** Recursively collect all PNG/JPEG/JPG files under `dir`. */
async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    if (CONFIG.exclude.includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await collectImages(full)))
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      results.push(full)
    }
  }
  return results
}

/**
 * Returns true when the webp sibling is already up-to-date
 * (exists AND its mtime >= source mtime).
 */
async function webpIsUpToDate(srcPath) {
  const webpPath = srcPath.replace(/\.(jpe?g|png)$/i, '.webp')
  if (!existsSync(webpPath)) return false
  const [srcStat, webpStat] = await Promise.all([stat(srcPath), stat(webpPath)])
  return webpStat.mtimeMs >= srcStat.mtimeMs
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Dynamically require sharp — friendly error if not installed.
  let sharp
  try {
    const require = createRequire(import.meta.url)
    sharp = require('sharp')
  } catch {
    console.error(c.red('\n✖  sharp is not installed.'))
    console.error('   Run:  npm install --save-dev sharp\n')
    process.exit(1)
  }

  console.log(c.bold('\n🌿  RVS-Agri Image Optimiser'))
  if (isDryRun) console.log(c.yellow('   DRY-RUN mode — no files will be written.\n'))
  else          console.log(c.grey('   Run with --dry-run to preview changes first.\n'))

  const projectRoot = path.resolve('.')
  const inputDir = path.join(projectRoot, CONFIG.inputDir)

  const images = await collectImages(inputDir)
  console.log(c.cyan(`Found ${images.length} image(s) under ${CONFIG.inputDir}/\n`))

  let skipped = 0
  let processed = 0
  let totalSavedOriginal = 0
  let totalSavedWebP = 0
  let totalOriginalSize = 0

  for (const srcPath of images) {
    const relPath = path.relative(projectRoot, srcPath)
    const ext = path.extname(srcPath).toLowerCase()
    const webpPath = srcPath.replace(/\.(jpe?g|png)$/i, '.webp')

    // Skip if webp already exists and is fresh
    if (await webpIsUpToDate(srcPath)) {
      if (isVerbose) console.log(c.grey(`  skip  ${relPath}`))
      skipped++
      continue
    }

    const srcStat = await stat(srcPath)
    const originalSize = srcStat.size
    totalOriginalSize += originalSize

    if (isDryRun) {
      console.log(c.yellow(`  would optimise  ${relPath}  (${fmtBytes(originalSize)})`))
      processed++
      continue
    }

    try {
      // ── 1. Re-compress the original in place ──────────────────────────────
      const tmpPath = srcPath + '.tmp'
      const sharpInstance = sharp(srcPath)

      if (ext === '.png') {
        await sharpInstance
          .png({ quality: CONFIG.pngQuality, compressionLevel: 9 })
          .toFile(tmpPath)
      } else {
        // .jpg / .jpeg
        await sharpInstance
          .jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true })
          .toFile(tmpPath)
      }

      const tmpStat = await stat(tmpPath)

      // Only overwrite if the re-compressed version is actually smaller
      if (tmpStat.size < originalSize) {
        await rename(tmpPath, srcPath)
        totalSavedOriginal += originalSize - tmpStat.size
        if (isVerbose)
          console.log(`  orig  ${relPath}  ${fmtSaving(originalSize, tmpStat.size)}`)
      } else {
        // Re-compression made it larger — discard the tmp, keep original
        await rename(tmpPath, tmpPath.replace('.tmp', ''))  // restore
        // Actually just remove the tmp
        const { unlink } = await import('node:fs/promises')
        await unlink(srcPath + '.tmp').catch(() => {})
        if (isVerbose)
          console.log(c.grey(`  orig  ${relPath}  already optimal, keeping original`))
      }

      // ── 2. Generate .webp sibling ─────────────────────────────────────────
      await sharp(srcPath)
        .webp({ quality: CONFIG.webpQuality, effort: 6 })
        .toFile(webpPath)

      const webpStat = await stat(webpPath)
      const webpSaved = originalSize - webpStat.size
      totalSavedWebP += webpSaved

      console.log(
        c.green(`  ✔  ${relPath}\n`) +
        c.grey(`       webp: ${fmtSaving(originalSize, webpStat.size)}`)
      )
      processed++
    } catch (err) {
      console.error(c.red(`  ✖  Failed: ${relPath}\n     ${err.message}`))
    }
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(55))
  console.log(c.bold('Summary'))
  console.log(`  Images found   : ${images.length}`)
  console.log(`  Processed      : ${c.green(String(processed))}`)
  console.log(`  Skipped (fresh): ${c.grey(String(skipped))}`)
  if (!isDryRun && processed > 0) {
    console.log(`  Saved (orig)   : ${c.green(fmtBytes(totalSavedOriginal))}`)
    console.log(`  Saved (webp)   : ${c.green(fmtBytes(totalSavedWebP))} vs original sizes`)
  }
  console.log('─'.repeat(55) + '\n')

  if (!isDryRun && processed > 0) {
    console.log(c.bold('Next step — build & deploy:'))
    console.log('  npm run build')
    console.log('  # then upload the dist/ folder to your shared hosting\n')
  }
}

main().catch((err) => {
  console.error(c.red('\nFatal error:'), err)
  process.exit(1)
})
