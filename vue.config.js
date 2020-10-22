const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  pages: {
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.js",
      title: "Popup"
    },
    sidebar: {
      template: "public/browser-extension.html",
      entry: "./src/sidebar/main.js",
      title: "Sidebar"
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
