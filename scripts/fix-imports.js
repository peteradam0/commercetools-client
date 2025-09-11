#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs'
import { glob } from 'glob'
import path from 'path'

function convertRelativeToAbsolute(filePath, content) {
  const lines = content.split('\n')
  const srcDir = path.resolve('src')
  const currentDir = path.dirname(path.resolve(filePath))

  return lines
    .map(line => {
      const importMatch = line.match(
        /^(\s*(?:import|export).*?from\s+['"])(\.\.?\/[^'"]*?)(['"].*?)$/
      )
      if (!importMatch) return line

      const [, prefix, relativePath, suffix] = importMatch

      if (relativePath.startsWith('@/')) return line

      try {
        const absolutePath = path.resolve(currentDir, relativePath)

        if (!absolutePath.startsWith(srcDir)) return line

        const aliasPath =
          '@' + absolutePath.substring(srcDir.length).replace(/\\/g, '/')

        const cleanAliasPath = aliasPath.replace(/\.(ts|tsx|js|jsx)$/, '')

        console.log(`  ${relativePath} → ${cleanAliasPath}`)
        return `${prefix}${cleanAliasPath}${suffix}`
      } catch (error) {
        console.error(
          `Error processing ${relativePath} in ${filePath}:`,
          error.message
        )
        return line
      }
    })
    .join('\n')
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const newContent = convertRelativeToAbsolute(filePath, content)

    if (content !== newContent) {
      console.log(`\n📝 Processing: ${filePath}`)
      fs.writeFileSync(filePath, newContent, 'utf-8')
      return true
    }
    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🔄 Converting relative imports to absolute imports...\n')

  const files = await glob('src/**/*.{ts,tsx,js,jsx}', {
    ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**'],
  })

  let changedFiles = 0

  for (const file of files) {
    if (processFile(file)) {
      changedFiles++
    }
  }

  console.log(
    `\n✅ Processed ${files.length} files, changed ${changedFiles} files`
  )

  if (changedFiles > 0) {
    console.log('\n🎨 Running Prettier to format imports...')
    try {
      execSync('npx prettier --write "src/**/*.{ts,tsx,js,jsx}"', {
        stdio: 'inherit',
      })
      console.log('✅ Prettier formatting completed')
    } catch (error) {
      console.error('❌ Prettier formatting failed:', error.message)
    }
  }

  console.log('\n🎉 Import optimization completed!')
}

main().catch(error => {
  console.error('❌ Script failed:', error.message)
  process.exit(1)
})
