let iframe;
let trigger;
let collect;
let curCollectInfo;
let iframeLoaded = false;
// eslint-disable-next-line no-unused-vars
let collectStatus = "reject";

// function setStyle(obj, css) {
//   for (const atr in css) {
//     obj.style[atr] = css[atr];
//   }
// }

function mousePos(e) {
  e = e || window.event;
  var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; //分别兼容ie和chrome
  var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  var x = e.pageX || e.clientX + scrollX; //兼容火狐和其他浏览器
  var y = e.pageY || e.clientY + scrollY;
  return { x: x, y: y };
}

// 只在最顶层页面嵌入 iframe
if (window.self === window.top) {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      // inject css
      const link = document.createElement("link");
      link.href = chrome.runtime.getURL("content.css");
      //chrome-extension://<extension id>/main.css
      link.rel = "stylesheet";
      const head = document.getElementsByTagName("head")[0];
      head.appendChild(link);

      // vue iframe
      iframe = document.createElement("iframe");
      iframe.id = "workstation__iframe";
      iframe.frameBorder = "none";
      iframe.src = chrome.extension.getURL("popup.html");
      document.body.appendChild(iframe);

      // fixed dom
      trigger = document.createElement("div");
      trigger.id = "workstation__trigger";
      trigger.textContent = "工作台";
      document.body.appendChild(trigger);

      // collect box
      collect = document.createElement("div");
      collect.id = "collect__wrapper";

      const collectTitle = document.createElement("h1");
      collectTitle.textContent = "收藏区";
      collectTitle.id = "collect__wrapper-title";
      collect.appendChild(collectTitle);

      const collectTips = document.createElement("div");
      collectTips.id = "collect__wrapper-tips";
      collectTips.textContent = "拖拽至此处以完成收藏";
      collect.appendChild(collectTips);

      // pending message
      curCollectInfo = document.createElement("p");
      curCollectInfo.id = "collect__wrapper-current";
      curCollectInfo.style.display = "none";
      curCollectInfo.style.setProperty("word-break", "break-word");
      curCollectInfo.style.setProperty("margin-left", "40px");
      collect.appendChild(curCollectInfo);

      // collect box
      document.body.appendChild(collect);

      // get postMessage
      window.addEventListener(
        "message",
        event => {
          const { type, to, iframeLoaded: loaded, fullpage } = event.data;

          if (fullpage) {
            iframe.classList.add("wockstation-full-iframe");
          } else {
            iframe.classList.remove("wockstation-full-iframe");
          }
          if (type === "mounted" && to === "content") {
            iframeLoaded = loaded;
          }
        },
        false
      );

      // sidebar click event
      trigger.addEventListener("click", () => {
        console.log("show iframe", iframeLoaded);
        if (iframeLoaded) {
          // 展开 iframe
          // show = !show;
          iframe.style.setProperty("transform", "translateX(0px)", "important");

          // 收起 trigger
          // showTrigger = !showTrigger;
          trigger.style.setProperty(
            "transform",
            "translateX(-30px)",
            "important"
          );
        }
      });

      // get postMessage
      window.addEventListener(
        "message",
        event => {
          const { type, to, close } = event.data;
          if (type === "workstation" && to === "content") {
            if (close) {
              // 收起 iframe
              // show = !show;
              iframe.style.setProperty(
                "transform",
                "translateX(-336px)",
                "important"
              );
              // 展示 trigger
              // showTrigger = !showTrigger;
              trigger.style.setProperty(
                "transform",
                "translateX(0px)",
                "important"
              );
            }
          }
        },
        false
      );

      // 监听拖拽 & dragstart
      document.addEventListener("dragstart", e => {
        // 判断来源类型
        const origin = e.target.nodeName.toLowerCase();
        const type_map = {
          "#text": 6,
          a: 7,
          img: 8
        };
        const type = type_map[origin] || 0;

        if (type === 6) {
          e.dataTransfer.setData("text", e.dataTransfer.getData("text"));
        }
        if (type === 7) {
          e.dataTransfer.setData("link", e.dataTransfer.getData("text"));
        }
        if (type === 8) {
          e.dataTransfer.setData("img", e.target.src);
        }
        e.dataTransfer.setData("origin/type", type);
      });

      // 监听拖拽 & remove
      document.addEventListener("drag", e => {
        // 显示收藏区 dom
        const { x: left } = mousePos(e);
        if (left < 350) {
          // show collect box
          collect.style.setProperty("transform", "translateX(0px)");
        }
        if (left > 350 && collectStatus !== "pending") {
          // close collect box
          collect.style.setProperty("transform", "translateX(-332px)");
        }
      });

      // dragenter
      document.addEventListener("dragenter", e => {
        // prevent default to allow drop
        e.preventDefault();
        return false;
      });

      // dragover
      // document.addEventListener("dragover", e => {
      //   // prevent default to allow drop
      //   e.preventDefault();
      //   console.log("dragover >>>>>");
      //   return false;
      // });

      const dropzone = document.getElementById("collect__wrapper");

      dropzone.addEventListener("dragenter", e => {
        // prevent default to allow drop
        e.preventDefault();
        return false;
      });

      // dragover collect__wrapper
      dropzone.addEventListener("dragover", e => {
        // prevent default to allow drop
        e.preventDefault();
        console.log("dropzone dragover >>>>>");
        return false;
      });

      // drop collect__wrapper
      dropzone.addEventListener("drop", e => {
        console.log("dropzone >>>>>>>");

        const type = +e.dataTransfer.getData("origin/type");
        const title =
          document.getElementsByTagName("title")[0].textContent || "";

        // 投放至收藏区
        if (collectStatus !== "pending") {
          const params = {
            type,
            title
          };

          // cur
          curCollectInfo.style.display = "block";

          switch (type) {
            case 6:
              params.remark = e.dataTransfer.getData("text");
              curCollectInfo.textContent = e.dataTransfer.getData("text");
              break;
            case 7:
              params.remark = e.dataTransfer.getData("link");
              curCollectInfo.textContent = e.dataTransfer.getData("link");
              break;
            case 8:
              Object.assign(params, {
                detail: { url: e.dataTransfer.getData("img") }
              });
              curCollectInfo.textContent = e.dataTransfer.getData("img");
              break;
            default:
              params.type = 0;
              break;
          }
          console.log("params >>>", type, params);
          // postMessage to iframe
          iframe.contentWindow.postMessage(
            { type: "createCollect", to: "iframe", data: params },
            "*"
          );

          // reset
        } else if (collectStatus !== "pending") {
          // close collect box
          collect.style.setProperty("transform", "translateX(-332px)");
          curCollectInfo.style.display = "none";
          curCollectInfo.textContent = "";
        }
      });

      // all document drop end
      document.addEventListener("dragend", () => {
        // dragend 不能做最后传递数据，getData("origin/type") 的值会丢失
        if (collectStatus !== "pending") {
          // close collect box
          collect.style.setProperty("transform", "translateX(-332px)");
        }
      });

      // get collect created message
      window.addEventListener(
        "message",
        event => {
          const { type, to, status } = event.data;
          if (type === "collectCreated" && to === "content") {
            console.log(status);
            if (status === "done") {
              // 收起收藏面板
              collect.style.setProperty("transform", "translateX(-332px)");
            }
            // pending
            if (status === "pending") {
              collectStatus = status;
              collectTitle.textContent = "收藏中... ...";
              collectTips.style.display = "none";
            } else {
              collectStatus = status;
              collectTitle.textContent = "收藏区";
              collectTips.style.display = "block";
              curCollectInfo.textContent = "";
              curCollectInfo.style.display = "none";
            }
          }
        },
        false
      );
    }
  };
}
