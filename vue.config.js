module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
  // webpack-dev-server 相关配置
  devServer: {
    port: 9020
  },
  // 基本路径
  // baseUrl: './',

  // 输出文件目录
  outputDir: 'dist',
}
