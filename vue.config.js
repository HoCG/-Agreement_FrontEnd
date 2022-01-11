module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  css: {
    // Enable CSS source maps.
    sourceMap: true
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    // add replacement loader(s)
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
    config.module.rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader').loader('file-loader')
  }
}
