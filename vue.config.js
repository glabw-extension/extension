/*
 * @Author: your name
 * @Date: 2020-10-28 18:40:02
 * @LastEditTime: 2020-12-01 11:48:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/vue.config.js
 */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  publicPath: '/',

  pages: {
    // popup: {
    //   template: "public/browser-extension.html",
    //   entry: "./src/main.js",
    //   title: "Popup"
    // },
    popup2: {
      // template: "public/browser-extension.html",
      entry: "./src/main.js",
      title: "test"
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.js"
        },
        contentScripts: {
          entries: {
            contentScripts: "src/contentScripts/content_script.js"
          }
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
            from: path.resolve("src/content.css"),
            to: path.resolve("dist")
          }
        ]
      })
    ]
  }
};
