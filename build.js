const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs-extra')

// Root of the repo
const ROOT = __dirname
const ACTIVITY = 'Activity 1.12' // only build this activity

const outPublic = path.join(ROOT, 'public')

async function buildActivity() {
  await fs.remove(outPublic)
  await fs.mkdirp(outPublic)

  const actPath = path.join(ROOT, ACTIVITY)
  console.log('\nBuilding', ACTIVITY)

  try {
    // Install & build
    execSync('npm install', { cwd: actPath, stdio: 'inherit' })
    execSync('npm run build', { cwd: actPath, stdio: 'inherit' })

    // Copy dist to public/<slug>
    const slug = ACTIVITY.replace(/\s+/g, '-').toLowerCase()
    const dest = path.join(outPublic, slug)
    await fs.copy(path.join(actPath, 'dist'), dest)
    console.log('Copied build to', dest)
  } catch (err) {
    console.error('Failed building', ACTIVITY, err)
    process.exit(1)
  }

  // copy root index.html if exists
  const rootIndex = path.join(ROOT, 'index.html')
  const publicIndex = path.join(outPublic, 'index.html')
  if (await fs.pathExists(rootIndex)) {
    await fs.copy(rootIndex, publicIndex)
    console.log('Copied root index.html to public/index.html')
  } else {
    console.warn('No root index.html found to copy into public/')
  }

  console.log('\nBuild complete. Public folder ready.')
}

buildActivity()
