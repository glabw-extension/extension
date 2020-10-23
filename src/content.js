let iframe;
let trigger;
let collect;
let curCollectInfo;
let iframeLoaded = false;
// eslint-disable-next-line no-unused-vars
let collectStatus = "reject";

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
  return { x: x, y: y };
}

function dragstart_handler(e) {
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
}

function drag_handler(e) {
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
}

function drop_handler(e) {
  e.preventDefault(); // stop the browser from redirection
  const { x: left } = mousePos(e);
  const isDropDom = e.toElement.id.includes("collect__wrapper");

  const type = +e.dataTransfer.getData("origin/type");
  const title = document.getElementsByTagName("title")[0].textContent || "";

  console.log("type >", type, "title >", title);
  // 投放至收藏区
  if (left < 300 && isDropDom && collectStatus !== "pending") {
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
        params.title = e.dataTransfer.getData("img");
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

      // 监听拖拽 & dragstart
      document.addEventListener("dragstart", dragstart_handler);

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
