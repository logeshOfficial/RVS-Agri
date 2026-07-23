#!/usr/bin/env node
/**
 * install-git-hooks.js
 * ====================
 * Installs a Git pre-commit hook that automatically optimizes any PNG/JPEG
 * images staged for commit before they enter the repository.
 *
 * Run once after cloning:
 *   node scripts/install-git-hooks.js
 *
 * Or add it to your postinstall script so it runs automatically:
 *   "postinstall": "node scripts/install-git-hooks.js"
 */

import { writeFile, mkdir, chmod, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const HOOK_PATH = path.resolve('.git', 'hooks', 'pre-commit')
const HOOKS_DIR = path.resolve('.git', 'hooks')

const HOOK_SCRIPT = `#!/usr/bin/env node
/**
 * Git pre-commit hook — image optimisation
 * Runs automatically before every commit.
 * Optimizes any staged PNG/JPEG images and re-stages them.
 */

import { execSync, spawnSync } from 'node:child_process'
import { stat, rename, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const c = {
  green: (s) => \`\\x1b[32m\${s}\\x1b[0m\`,
  yellow:(s) => \`\\x1b[33m\${s}\\x1b[0m\`,
  grey:  (s) => \`\\x1b[90m\${s}\\x1b[0m\`,
  bold:  (s) => \`\\x1b[1m\${s}\\x1b[0m\`,
  red:   (s) => \`\\x1b[31m\${s}\\x1b[0m\`,
}

function fmtBytes(b) {
  if (b < 1024) return b + ' B'
  if (b < 1024**2) return (b/1024).toFixed(1) + ' KB'
  return (b/1024**2).toFixed(2) + ' MB'
}

async function optimizeAndStage(filePath, sharp) {
  const ext = path.extname(filePath).toLowerCase()
  const webpPath = filePath.replace(/\\.(jpe?g|png)$/i, '.webp')

  try {
    const srcStat = await stat(filePath)
    const originalSize = srcStat.size

    // Compress original
    const tmpPath = filePath + '.opt.tmp'
    if (ext === '.png') {
      await sharp(filePath).png({ quality: 80, compressionLevel: 9 }).toFile(tmpPath)
    } else {
      await sharp(filePath).jpeg({ quality: 80, mozjpeg: true }).toFile(tmpPath)
    }

    const tmpStat = await stat(tmpPath)
    if (tmpStat.size < originalSize) {
      await rename(tmpPath, filePath)
      console.log(\`  ✔ compressed  \${filePath}  \${c.grey(fmtBytes(originalSize) + ' → ' + fmtBytes(tmpStat.size))}\`)
    } else {
      await unlink(tmpPath)
    }

    // Generate WebP
    await sharp(filePath).webp({ quality: 82, effort: 6 }).toFile(webpPath)
    console.log(\`  ✔ webp        \${webpPath}\`)

    // Re-stage both files
    spawnSync('git', ['add', filePath, webpPath], { stdio: 'inherit' })

  } catch (err) {
    console.error(\`  ✖ failed: \${filePath}\\n    \${err.message}\`)
  }
}

async function main() {
  // Get list of staged PNG/JPEG files
  const result = spawnSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACM'], {
    encoding: 'utf8'
  })

  const staged = result.stdout.trim().split('\\n')
    .filter(f => /\\.(jpe?g|png)$/i.test(f) && existsSync(f))

  if (staged.length === 0) process.exit(0)

  let sharp
  try {
    const require = createRequire(import.meta.url)
    sharp = require('sharp')
  } catch {
    console.warn(c.yellow('  ⚠  sharp not installed — skipping image optimization in pre-commit hook'))
    console.warn(c.yellow('     Run: npm install --save-dev sharp'))
    process.exit(0) // don't block the commit
  }

  console.log(c.bold('\\n🌿  Pre-commit: optimizing ' + staged.length + ' image(s)...'))

  for (const file of staged) {
    await optimizeAndStage(file, sharp)
  }

  console.log(c.green('✓  Done\\n'))
  process.exit(0)
}

main().catch((err) => {
  console.error('Pre-commit hook error:', err)
  process.exit(0) // never block a commit on hook failure
})
`

async function main() {
  if (!existsSync(HOOKS_DIR)) {
    await mkdir(HOOKS_DIR, { recursive: true })
  }

  // If hook already exists, back it up
  if (existsSync(HOOK_PATH)) {
    const existing = await readFile(HOOK_PATH, 'utf8')
    if (existing.includes('image optimis')) {
      console.log('✔  Git pre-commit hook already installed.')
      process.exit(0)
    }
    await writeFile(HOOK_PATH + '.bak', existing)
    console.log('⚠  Existing hook backed up to .git/hooks/pre-commit.bak')
  }

  await writeFile(HOOK_PATH, HOOK_SCRIPT, 'utf8')

  // Make it executable (no-op on Windows but harmless)
  try { await chmod(HOOK_PATH, 0o755) } catch {}

  console.log('✔  Git pre-commit hook installed at .git/hooks/pre-commit')
  console.log('   Any PNG/JPEG you stage will be auto-optimized before commit.')
}

main().catch((err) => {
  console.error('Failed to install git hook:', err)
  process.exit(1)
})
