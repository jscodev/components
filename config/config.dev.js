const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('../packages')).set('@components', resolve('../examples/components'))
    config.module
      .rule('js')
      .include.add('/packages') // 要处理的文件路径
      .end() // 返回include
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        return options
      })
  }
}
