const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = (dir) => path.join(__dirname, '../', dir)

function getComponentEntries(path) {
  let files = fs.readdirSync(resolve(path))

  const componentEntries = files.reduce((fileObj, item) => {
    const itemPath = join(path, item)

    const isDir = fs.statSync(itemPath).isDirectory()
    const [name, suffix] = item.split('.')

    if (isDir) {
      fileObj[item] = resolve(join(itemPath, 'index.js'))
    } else if (suffix === 'js') {
      fileObj[name] = resolve(`${itemPath}`)
    }
    return fileObj
  }, {})

  return componentEntries
}

const buildConfig = {
  parallel: false,
  outputDir: resolve('lib'),
  productionSourceMap: false,
  configureWebpack: {
    entry: getComponentEntries('packages'),
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default'
    }
  },
  css: {
    sourceMap: false,
    extract: {
      filename: '[name]/index.css'
    }
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks') // 关闭代码分割
    config.plugins.delete('copy') // 取消复制public下的文件
    config.plugins.delete('preload') // 关闭预加载
    config.plugins.delete('prefetch') // 关闭预加载
    config.plugins.delete('html') // 不生成html
    config.plugins.delete('hmr') // 取消热更新
    config.entryPoints.delete('app') // 删除自动加上的入口App
  }
}
module.exports = buildConfig
