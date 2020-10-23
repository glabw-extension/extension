let iframe;
let trigger;
let collect;
let iframeLoaded = false;
console.log("content js start >>>");

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
  console.log(x, y);
  return { x: x, y: y };
}

function drag_handler(e) {
  // console.log("dragenter getData >>>", e.dataTransfer.getData("text"));
  // console.log("dragenter >>>", e.target);
  // 显示收藏区 dom
  const { x: left } = mousePos(e);
  if (left < 350) {
    console.log("show collect box >>>", left);
    // show collect box
    collect.style.setProperty("transform", "translateX(0px)");
  }
  if (left > 350) {
    console.log("close collect box >>>", left);
    // close collect box
    collect.style.setProperty("transform", "translateX(-312px)");
  }
}

function drop_handler(e) {
  e.preventDefault(); // stop the browser from redirection
  console.log("drop >>>", e);
  // close collect box
  collect.style.setProperty("transform", "translateX(-312px)");
}

function handleDragEnd(e) {
  console.log("drag end:", e.target);
  // reset
  collect.style.setProperty("transform", "translateX(-312px)");
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
      const h1 = document.createElement("h1");
      h1.textContent = "收藏区";
      h1.id = "collect__wrapper-title";
      collect.appendChild(h1);
      const tips = document.createElement("div");
      tips.id = "collect__wrapper-tips";
      tips.textContent = "拖拽至此处以完成收藏";
      collect.appendChild(tips);
      document.body.appendChild(collect);

      // get postMessage
      window.addEventListener(
        "message",
        event => {
          const { type, to, iframeLoaded: loaded } = event.data;
          if (type === "mounted" && to === "content") {
            console.log("mounted >>>", loaded);
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
            console.log(close);
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

      // 监听拖拽 & remove
      document.addEventListener("drag", drag_handler);
      // dragover
      document.addEventListener(
        "dragover",
        e => {
          // prevent default to allow drop
          e.preventDefault();
        },
        false
      );
      // drop
      document.addEventListener("drop", drop_handler);
      // drop end
      document.addEventListener("dragend", handleDragEnd);

      // document.removeEventListener("dragstart", drag_handler);
    }
  };
}
