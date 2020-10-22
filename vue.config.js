const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/main.js",
      title: "Popup"
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js"
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve("src/content.js"),
            to: path.resolve("dist")
          }
        ]
      })
    ]
  }
};
