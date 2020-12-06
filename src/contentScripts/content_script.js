
import Wrapper from "./wrapper.js";
// import Dragzone from "./dragzone.js";
// import Plugin from "./plugin.js";

// import Vue from 'vue'
// import App from '@/App.vue'

let collect;
let curCollectInfo;

// eslint-disable-next-line no-unused-vars
let collectStatus = "done";

// 只在最顶层页面嵌入 iframe
if (window.self === window.top) {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded change publicPaths ========>>>>");

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

    // // inject js
    // const linkLogin = document.createElement("link");
    // linkLogin.href = chrome.runtime.getURL("js/login.js");
    // linkLogin.rel = "prefetch";
    // head.appendChild(linkLogin);

    // const linkMind = document.createElement("link");
    // linkMind.href = chrome.runtime.getURL("js/mind-map.js");
    // linkMind.rel = "prefetch";
    // head.appendChild(linkMind);

    // const linPlugin = document.createElement("link");
    // linPlugin.href = chrome.runtime.getURL("js/plugin.js");
    // linPlugin.rel = "prefetch";
    // head.appendChild(linPlugin);

    // const linkChunkVendors = document.createElement("link");
    // linkChunkVendors.href = chrome.runtime.getURL("js/chunk-vendors.js");
    // linkChunkVendors.rel = "preload";
    // linkChunkVendors.as = 'script'
    // head.appendChild(linkChunkVendors);

    // const linkPopup2 = document.createElement("link");
    // linkPopup2.href = chrome.runtime.getURL("js/popup2.js");
    // linkPopup2.rel = "preload";
    // linkPopup2.as = 'script'
    // head.appendChild(linkPopup2);



    const wrapper = new Wrapper();
    // #workstation_extension_wrapper
    // wrapper.appendTo();
    document.body.appendChild(wrapper.wrapper)

    // 挂在一个 vue 的根结点
    const vueApp = document.createElement('div')
    vueApp.id = 'app-ext'
    wrapper.wrapper.appendChild(vueApp)
    // document.querySelector('#workstation_extension_wrapper').appendChild(vueApp)
    // document.body.appendChild(vueApp)


    // 引入插件内 script 代码
    const vendors_script = document.createElement('script')
    vendors_script.src = chrome.runtime.getURL("js/chunk-vendors.js");
    vendors_script.onload = () => {
      console.log('====== vendors_script n ======>')
    }

    document.body.appendChild(vendors_script)

    const popup2_script = document.createElement('script')
    popup2_script.src = chrome.runtime.getURL("js/popup2.js");
    popup2_script.onload = () => {
      console.log('====== popup2_script n ======>')
    }

    document.body.appendChild(popup2_script)


    // // 引入本地的 vue 代码
    // const vue_script = document.createElement('script')
    // vue_script.src = chrome.runtime.getURL("vue.min.js");
    // vue_script.onload = () => {



    //   // 引入插件内 App 代码
    //   // const app_script = document.createElement('script')
    //   // app_script.src = chrome.runtime.getURL("myPlugin.umd.js");
    //   // app_script.onload = () => {
    //   //   console.log('====== add vue vender & login & mind-map & manifest 1 ======>')
    //   // }

    //   // document.body.appendChild(app_script)
    // }
    // document.body.appendChild(vue_script)

    // 挂载插件
    // const plugin = new Plugin();
    // plugin.appendTo("#workstation_extension_wrapper");

    // 构造收藏放置区 & 挂载
    // const collectDom = new Dragzone();
    // collectDom.appendTo("#workstation_extension_wrapper");

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
            // collectDom.closeDragzone();
            // 让放置区可拖拽
            // Dragzone.isDraging = true;
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
            // plugin.closePlugin();

            // 展示 trigger
            // plugin.showTrigger();
          }
        }

        if (type === "fullpage" && fullpage) {
          // 全屏插件
          // document.firstElementChild.classList.add("workstation-full-page");

          // wrapper.fullpage();
          // plugin.fullpage();
        }

        if (type === "unfullpage" && fullpage === false) {
          // 关闭全屏插件
          console.log("un fullpage >>>");
          // document.firstElementChild.classList.remove("workstation-full-page");
          // wrapper.closeFullpage();
          // plugin.closeFullpage();
        }

        // 更新加载完成状态
        if (type === "mounted" && to === "content") {
          // iframe vue instance is mounted
          console.log(loaded)
          // plugin.iframeVueInstanceMounted = loaded;
        }
      },
      false
    );
  });
}
