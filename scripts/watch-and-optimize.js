#!/usr/bin/env node
/**
 * watch-and-optimize.js
 * =====================
 * Automated image optimization watcher for RVS-Agri.
 *
 * WHAT IT DOES:
 *  - Watches public/ folder for new or changed PNG/JPEG/JPG files
 *  - Automatically compresses them and generates .webp versions
 *  - Runs continuously in the background during development
 *  - Debounces rapid file changes to avoid duplicate processing
 *
 * USAGE:
 *   npm run watch-images           # starts the watcher
 *   Ctrl+C to stop
 *
 * REQUIREMENTS:
 *   npm install --save-dev chokidar sharp
 */

import chokidar from 'chokidar'
import { stat, rename, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

// ── Configuration ────────────────────────────────────────────────────────────

const CONFIG = {
  watchDir: 'public',
  jpegQuality: 80,
  pngQuality: 80,
  webpQuality: 82,
  debounceMs: 500, // wait 500ms after last change before processing
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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

function fmtTime() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  return c.grey(`[${h}:${m}:${s}]`)
}

// ── Image Processor ──────────────────────────────────────────────────────────

async function optimizeImage(filePath, sharp) {
  const ext = path.extname(filePath).toLowerCase()
  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp')
  const relPath = path.relative('.', filePath)

  try {
    const srcStat = await stat(filePath)
    const originalSize = srcStat.size

    // Skip if webp is already fresh
    if (existsSync(webpPath)) {
      const webpStat = await stat(webpPath)
      if (webpStat.mtimeMs >= srcStat.mtimeMs) {
        console.log(`${fmtTime()} ${c.grey(`skip`)}  ${relPath} ${c.grey('(webp already fresh)')}`)
        return
      }
    }

    console.log(`${fmtTime()} ${c.cyan('processing')}  ${relPath}`)

    // ── 1. Re-compress original in place ─────────────────────────────────────
    const tmpPath = filePath + '.tmp'
    const sharpInstance = sharp(filePath)

    if (ext === '.png') {
      await sharpInstance
        .png({ quality: CONFIG.pngQuality, compressionLevel: 9 })
        .toFile(tmpPath)
    } else {
      await sharpInstance
        .jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true })
        .toFile(tmpPath)
    }

    const tmpStat = await stat(tmpPath)

    // Only keep the compressed version if it's smaller
    if (tmpStat.size < originalSize) {
      await rename(tmpPath, filePath)
      const saved = originalSize - tmpStat.size
      console.log(`${fmtTime()} ${c.green('✔ orig')}  ${relPath}  ${c.grey(`saved ${fmtBytes(saved)}`)}`)
    } else {
      await unlink(tmpPath)
      console.log(`${fmtTime()} ${c.grey('✔ orig')}  ${relPath}  ${c.grey('already optimal')}`)
    }

    // ── 2. Generate .webp ────────────────────────────────────────────────────
    await sharp(filePath)
      .webp({ quality: CONFIG.webpQuality, effort: 6 })
      .toFile(webpPath)

    const webpStat = await stat(webpPath)
    const webpSaved = originalSize - webpStat.size
    const pct = ((webpSaved / originalSize) * 100).toFixed(1)

    console.log(`${fmtTime()} ${c.green('✔ webp')}  ${relPath}  ${c.grey(`saved ${fmtBytes(webpSaved)} (${pct}%)`)}`)

  } catch (err) {
    console.error(`${fmtTime()} ${c.red('✖ error')}  ${relPath}\n     ${err.message}`)
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Dynamically require sharp
  let sharp
  try {
    const require = createRequire(import.meta.url)
    sharp = require('sharp')
  } catch {
    console.error(c.red('\n✖  sharp is not installed.'))
    console.error('   Run:  npm install --save-dev sharp\n')
    process.exit(1)
  }

  // Dynamically require chokidar
  let chokidar_module
  try {
    const require = createRequire(import.meta.url)
    chokidar_module = require('chokidar')
  } catch {
    console.error(c.red('\n✖  chokidar is not installed.'))
    console.error('   Run:  npm install --save-dev chokidar\n')
    process.exit(1)
  }

  console.log(c.bold('\n🌿  RVS-Agri Image Watcher'))
  console.log(c.grey(`   Watching ${CONFIG.watchDir}/ for new images...\n`))

  // Track pending operations to debounce rapid changes
  const pending = new Map()

  const watcher = chokidar_module.watch(`${CONFIG.watchDir}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`, {
    persistent: true,
    ignoreInitial: true, // don't process existing files on startup
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  })

  watcher
    .on('add', (filePath) => {
      console.log(`${fmtTime()} ${c.yellow('detected')}  ${path.relative('.', filePath)}`)
      
      // Debounce: wait CONFIG.debounceMs before processing
      if (pending.has(filePath)) clearTimeout(pending.get(filePath))
      
      const timer = setTimeout(() => {
        pending.delete(filePath)
        optimizeImage(filePath, sharp)
      }, CONFIG.debounceMs)
      
      pending.set(filePath, timer)
    })
    .on('change', (filePath) => {
      console.log(`${fmtTime()} ${c.yellow('changed')}  ${path.relative('.', filePath)}`)
      
      if (pending.has(filePath)) clearTimeout(pending.get(filePath))
      
      const timer = setTimeout(() => {
        pending.delete(filePath)
        optimizeImage(filePath, sharp)
      }, CONFIG.debounceMs)
      
      pending.set(filePath, timer)
    })
    .on('error', (error) => {
      console.error(`${fmtTime()} ${c.red('watcher error:')} ${error}`)
    })

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log(c.yellow('\n\n⏹  Stopping watcher...'))
    watcher.close()
    process.exit(0)
  })
}

main().catch((err) => {
  console.error(c.red('\nFatal error:'), err)
  process.exit(1)
})
