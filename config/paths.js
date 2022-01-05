'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = {
    appBuild: resolveApp('build'),
    appServerTs: resolveApp('src/server.ts'),
    apPackageJson: resolveApp('package.json'),
    appNodemodule: resolveApp('node_modules'),
    appLog: resolveApp('logs'),
}
