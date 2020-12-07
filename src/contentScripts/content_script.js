import Wrapper from "./wrapper.js";
// import Dragzone from "./dragzone.js";
import Plugin from "./plugin.js";

let collect;
let curCollectInfo;

// eslint-disable-next-line no-unused-vars
let collectStatus = "done";

const loda_script = url => {
  return (
    typeof url === "string" &&
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    })
  );
};

// 只在最顶层页面嵌入 iframe
if (window.self === window.top) {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded change publicPaths ========>>>>");

    console.log("1 ========>>>>");

    try {
      // 挂载插件
      document.documentElement.setAttribute(
        "glab_workstation-extension-installed",
        true
      );

      // inject css
      const link = document.createElement("link");
      link.href = chrome.runtime.getURL("content.css");
      link.rel = "stylesheet";
      const head = document.getElementsByTagName("head")[0];
      head.appendChild(link);

      // 挂载最外层容器
      const wrapper = new Wrapper();
      // #glab_workstation_extension_wrapper
      // wrapper.appendTo();
      document.body.appendChild(wrapper.wrapper);

      // 挂载插件 dom & trigger
      const plugin = new Plugin();
      plugin.appendTo("#glab_workstation_extension_wrapper");
      plugin.triggerAppendTo("body");

      // 引入插件内 script 代码
      await loda_script(chrome.runtime.getURL("js/chunk-vendors.js"));
      await loda_script(chrome.runtime.getURL("js/popup2.js"));

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
            console.log(loaded);
            plugin.iframeVueInstanceMounted = loaded;
          }
        },
        false
      );
    } catch (error) {
      // alert("浏览器扩展资源下载失败，请重试");
      console.log("浏览器扩展资源下载失败，请重试");
    }

    console.log("2 ========>>>>");
  });
}
