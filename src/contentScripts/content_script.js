/*
 * @Author: xq
 * @Date: 2020-11-25 16:51:18
 * @LastEditTime: 2020-11-30 20:04:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/js/content_script.js
 */

import Wrapper from "./wrapper.js";
import Dragzone from "./dragzone.js";
import Plugin from "./plugin.js";

let collect;
let curCollectInfo;

// eslint-disable-next-line no-unused-vars
let collectStatus = "done";

// 只在最顶层页面嵌入 iframe
if (window.self === window.top) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded >>>>");

    // 挂载插件
    document.documentElement.setAttribute(
      "workstation-extension-installed",
      true
    );

    // inject css
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL("content.css");
    link.rel = "stylesheet";
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(link);

    const wrapper = new Wrapper();
    // #workstation_extension_wrapper
    wrapper.appendTo();

    // 挂载插件
    const plugin = new Plugin();
    plugin.appendTo("#workstation_extension_wrapper");

    // 构造收藏放置区 & 挂载
    const collectDom = new Dragzone();
    collectDom.appendTo("#workstation_extension_wrapper");

    // get collect created message
    window.addEventListener(
      "message",
      event => {
        const {
          type,
          to,
          status,
          close = false,
          iframeLoaded: loaded = false,
          fullpage = false
        } = event.data;
        // 收藏状态反馈
        if (type === "collectCreated" && to === "content") {
          console.log(status);
          if (status === "done") {
            // 收起收藏面板
            collect.style.setProperty("transform", "translateX(-376px)");
            // 收藏接口请求完成后
            collectDom.closeDragzone();
            // 让放置区可拖拽
            Dragzone.isDraging = true;
          }
          // pending
          if (status === "pending") {
            collectStatus = status;
            // collectTitle.textContent = "收藏中... ...";
            // collectTips.style.display = "none";
          } else {
            collectStatus = status;
            // collectTitle.textContent = "收藏区";
            // collectTips.style.display = "block";
            curCollectInfo.textContent = "";
            curCollectInfo.style.display = "none";
          }
        }

        // 展开收起工作台面板
        if (type === "workstation" && to === "content") {
          if (close) {
            // 收起 iframe
            plugin.closePlugin();

            // 展示 trigger
            plugin.showTrigger();
          }
        }

        if (type === "fullpage" && fullpage) {
          // 全屏插件
          // document.firstElementChild.classList.add("workstation-full-page");

          wrapper.fullpage();
          plugin.fullpage();
        }

        if (type === "unfullpage" && fullpage === false) {
          // 关闭全屏插件
          console.log("un fullpage >>>");
          // document.firstElementChild.classList.remove("workstation-full-page");
          wrapper.closeFullpage();
          plugin.closeFullpage();
        }

        // 更新加载完成状态
        if (type === "mounted" && to === "content") {
          // iframe vue instance is mounted
          plugin.iframeVueInstanceMounted = loaded;
        }
      },
      false
    );
  });
}
