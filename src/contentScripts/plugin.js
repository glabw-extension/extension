/*
 * @Author: your name
 * @Date: 2020-11-25 18:40:31
 * @LastEditTime: 2020-11-30 19:56:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/contentScripts/plugin.js
 */
export default class Plugin {
  constructor(iframeVueInstanceMounted = false) {
    // iframeVueInstanceMounted 默认：false
    this.iframeVueInstanceMounted = iframeVueInstanceMounted;
    this.plugin = this.createPlugin();
    this.trigger = this.createTrigger();
  }

  createPlugin() {
    if (this.plugin) return this.plugin;
    const iframe = document.createElement("iframe");
    iframe.id = "workstation__iframe";
    iframe.frameBorder = "none";
    iframe.src = chrome.extension.getURL("popup.html");

    return iframe;
  }

  createTrigger() {
    if (this.trigger) return this.trigger;
    // fixed dom
    const trigger = document.createElement("div");
    trigger.id = "workstation__trigger";
    trigger.textContent = "工作台";

    // sidebar click event
    trigger &&
      trigger.addEventListener("click", () => {
        if (this.iframeVueInstanceMounted) {
          // 展开 iframe
          this.showPlugin();

          // 收起 trigger
          this.closeTrigger();
        }
      });

    return trigger;
  }

  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.plugin);
    parent.appendChild(this.trigger);
  }

  showPlugin() {
    // this.plugin.style.setProperty("transform", "translateX(0px)", "important");
    this.plugin.style.setProperty(
      "transform",
      "translateX(336px)",
      "important"
    );
  }

  closePlugin() {
    this.plugin.style.setProperty("transform", "translateX(0px)", "important");
  }

  showTrigger() {
    this.trigger.style.setProperty("transform", "translateX(0px)", "important");
  }

  closeTrigger() {
    this.trigger.style.setProperty(
      "transform",
      "translateX(-30px)",
      "important"
    );
  }

  fullpage() {
    this.plugin.style.setProperty("width", "100%", "important");
  }

  closeFullpage() {
    this.plugin.style.setProperty("width", "336px");
  }
}
