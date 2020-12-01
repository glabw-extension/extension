/*
 * @Author: your name
 * @Date: 2020-11-30 15:17:16
 * @LastEditTime: 2020-11-30 19:56:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/contentScripts/wrapper.js
 */
export default class Wrapper {
  // #workstation_extension_wrapper
  constructor() {
    this.wrapper = this.createWrapper();
  }

  createWrapper() {
    if (this.wrapper) return this.wrapper;
    const div = document.createElement("div");
    div.id = "workstation_extension_wrapper";

    return div;
  }

  appendTo() {
    const parent = document.body.parentNode;
    parent && parent.appendChild(this.wrapper);
  }

  fullpage() {
    this.wrapper.style.setProperty("width", "100%", "important");
  }

  closeFullpage() {
    this.wrapper.style.setProperty("width", "auto");
  }
}
