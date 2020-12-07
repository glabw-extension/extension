import Wrapper from "./wrapper";
export default class Plugin extends Wrapper {
  constructor(iframeVueInstanceMounted = false) {
    super();
    // iframeVueInstanceMounted 默认：false
    this.iframeVueInstanceMounted = iframeVueInstanceMounted;
    this.vueApp = this.createPlugin();
    this.trigger = this.createTrigger();
  }

  createPlugin() {
    if (this.vueApp) return this.vueApp;
    // 挂在一个 vue 的根结点
    const vueApp = document.createElement("div");
    vueApp.id = "glab_app_ext";

    return vueApp;
  }

  createTrigger() {
    if (this.trigger) return this.trigger;
    // fixed dom
    const trigger = document.createElement("div");
    trigger.id = "glab_open_trigger";
    trigger.textContent = "工作台";

    // sidebar click event
    trigger.addEventListener("click", () => {
      if (this.iframeVueInstanceMounted) {
        // 展开 wrapper
        this.showWrapper();

        // 收起 trigger
        this.closeTrigger();
      }
    });

    return trigger;
  }

  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.vueApp);
  }

  triggerAppendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.trigger);
  }

  showWrapper() {
    const wrapper = document.querySelector("#glab_workstation_extension_wrapper");
    wrapper &&
      wrapper.style.setProperty("transform", "translateX(336px)", "important");
  }

  closePlugin() {
    this.vueApp.style.setProperty("transform", "translateX(0px)", "important");
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
    this.vueApp.style.setProperty("width", "100%", "important");
  }

  closeFullpage() {
    this.vueApp.style.setProperty("width", "336px");
  }
}
