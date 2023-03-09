// const { defineConfig,path } = require("@vue/cli-service",'path');

const path = require("path");

module.exports = ({
  transpileDependencies: true,
  lintOnSave: false,

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      // 那些文件需要引入，使用绝对路径
      // 需要是path.join来拼接
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, "./src/assets/styles/variables.less"),
      ],
    },
  },
  devServer: {
    port: 8080,
    host: '127.0.0.1',
    https: false,
    open: true,
    allowedHosts: 'all'
  },
  // chainWebpack: config => {
    // 图片加载
    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => Object.assign(options, { limit: 10000 }))

    // 开启IP域名访问
    // config.devServer.disableHostCheck(true)
  // },
  
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
});
