let iframe;
let trigger;
let iframeLoaded = false;
console.log("content js start >>>");

// function setStyle(obj, css) {
//   for (const atr in css) {
//     obj.style[atr] = css[atr];
//   }
// }

// 只在最顶层页面嵌入 iframe
if (window.self === window.top) {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      iframe = document.createElement("iframe");
      iframe.id = "workstation";
      iframe.style.setProperty("height", "100%", "important");
      iframe.style.setProperty("width", "100%", "important");
      iframe.style.setProperty("min-width", "1px", "important");
      iframe.style.setProperty("position", "fixed", "important");
      iframe.style.setProperty("top", "0", "important");
      // iframe.style.setProperty("right", "0", "important");
      iframe.style.setProperty("left", "0", "important");
      iframe.style.setProperty("bottom", "unset", "important");
      iframe.style.setProperty("z-index", "9999999999999", "important");
      iframe.style.setProperty("transform", "translateX(-420px)", "important");
      iframe.style.setProperty("transition", "all .4s", "important");
      iframe.style.setProperty(
        "box-shadow",
        "0 0 15px 2px rgba(0,0,0,0.12)",
        "important"
      );
      iframe.frameBorder = "none";
      iframe.src = chrome.extension.getURL("popup.html");
      document.body.appendChild(iframe);

      // fixed dom
      trigger = document.createElement("div");
      trigger.className = "workstation-trigger";
      // trigger.style.setProperty("width", "30px", "important");
      trigger.style.setProperty("height", "94px", "important");
      trigger.style.setProperty("min-width", "1px", "important");
      trigger.style.setProperty("position", "fixed", "important");
      trigger.style.setProperty("top", "10vh", "important");
      // trigger.style.setProperty("right", "0", "important");
      trigger.style.setProperty("left", "0px", "important");
      trigger.style.setProperty("bottom", "unset", "important");
      trigger.style.setProperty("z-index", "9999999999999", "important");
      trigger.style.setProperty("transform", "translateX(0px)", "important");
      trigger.style.setProperty("transition", "all .4s", "important");
      trigger.style.setProperty(
        "background-color",
        "rgb(242, 245, 247)",
        "important"
      );
      trigger.style.setProperty("cursor", "pointer", "important");
      trigger.style.setProperty(
        "border-radius",
        "0px 4px 4px 0px",
        "important"
      );
      trigger.style.setProperty("border-width", "1px 1px 1px", "important");
      trigger.style.setProperty(
        "border-style",
        "solid solid solid none",
        "important"
      );
      trigger.style.setProperty(
        "border-color",
        "rgb(224, 228, 231) rgb(224, 228, 231) rgb(224, 228, 231)",
        "important"
      );
      trigger.style.setProperty("border-left", "none", "important");
      trigger.style.setProperty("padding", "6px", "important");
      trigger.style.setProperty("writing-mode", "vertical-rl", "important");
      trigger.style.setProperty(
        "box-shadow",
        "2px 0px 5px 0px rgba(0,0,0,0.12)",
        "important"
      );
      trigger.style.setProperty("font-size", "14px", "important");
      trigger.style.setProperty("text-align", "center", "important");
      trigger.textContent = "工作台";
      document.body.appendChild(trigger);

      // let show = false;
      // let showTrigger = true;

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
                "translateX(-420px)",
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
    }
  };
}
