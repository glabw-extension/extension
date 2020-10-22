let iframe;
let sidebar;
// let iframeLoaded = false;
console.log("content js >>>");

// 只在最顶层页面嵌入iframe
if (window.self === window.top) {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      iframe = document.createElement("iframe");
      iframe.className = "api-interceptor";
      iframe.style.setProperty("height", "400px", "important");
      iframe.style.setProperty("width", "400px", "important");
      iframe.style.setProperty("min-width", "1px", "important");
      iframe.style.setProperty("position", "fixed", "important");
      iframe.style.setProperty("top", "0", "important");
      iframe.style.setProperty("right", "0", "important");
      iframe.style.setProperty("left", "unset", "important");
      iframe.style.setProperty("bottom", "unset", "important");
      iframe.style.setProperty("z-index", "9999999999999", "important");
      iframe.style.setProperty("transform", "translateX(420px)", "important");
      iframe.style.setProperty("transition", "all .4s", "important");
      iframe.style.setProperty(
        "box-shadow",
        "0 0 15px 2px rgba(0,0,0,0.12)",
        "important"
      );
      iframe.frameBorder = "none";
      iframe.src = chrome.extension.getURL("popup.html");
      document.body.appendChild(iframe);
      let show = false;

      // fixed dom
      sidebar = document.createElement("div");
      sidebar.className = "sidebar";
      sidebar.style.setProperty("height", "100px", "important");
      sidebar.style.setProperty("width", "100px", "important");
      sidebar.style.setProperty("min-width", "1px", "important");
      sidebar.style.setProperty("position", "fixed", "important");
      sidebar.style.setProperty("top", "100px", "important");
      // sidebar.style.setProperty("right", "0", "important");
      sidebar.style.setProperty("left", "0px", "important");
      sidebar.style.setProperty("bottom", "unset", "important");
      sidebar.style.setProperty("z-index", "9999999999999", "important");
      sidebar.style.setProperty("transform", "translateX(0px)", "important");
      sidebar.style.setProperty("transition", "all .4s", "important");
      sidebar.style.setProperty(
        "box-shadow",
        "0 0 15px 2px rgba(0,0,0,0.12)",
        "important"
      );
      document.body.appendChild(sidebar);
      // sidebar click event
      sidebar.addEventListener("click", () => {
        console.log("show iframe");
        show = !show;
        iframe.style.setProperty(
          "transform",
          show ? "translateX(0)" : "translateX(420px)",
          "important"
        );
      });

      chrome.runtime.onMessage.addListener(msg => {
        if (msg == "toggle") {
          console.log("toggle", chrome.extension.getURL("popup.html"));
          show = !show;
          iframe.style.setProperty(
            "transform",
            show ? "translateX(0)" : "translateX(420px)",
            "important"
          );
        }
        return true;
      });
    }
  };
}
