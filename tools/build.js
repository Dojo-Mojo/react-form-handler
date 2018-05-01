/* inspired by https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/tools/build.js */
const fs = require('fs')
const execSync = require('child_process').execSync

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

console.log('Building CommonJS modules ...')

exec('babel src -d dist', { BABEL_ENV: 'cjs' })

console.log('\nBuilding ES modules ...')

exec('babel src -d es', { BABEL_ENV: 'es' })
