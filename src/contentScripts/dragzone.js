/*
 * @Author: your name
 * @Date: 2020-11-25 15:55:00
 * @LastEditTime: 2020-11-25 19:28:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/dragzone.js
 */
console.log("load dragzone.js >>>");
export default class Dragzone {
  // 拖拽控制器：true; 元素在放置区做操作时，禁止二次拖拽
  static isDraging = true;
  static styles = false;

  constructor() {
    this.element = this.createE();
  }

  createE() {
    if (this.element) return this.element;
    const dropzone = document.createElement("div");
    dropzone.id = "collect__wrapper";
    dropzone.innerHTML = `
      <h1 class="collect__wrapper-title">收藏区 my</h1>
      <div class="collect__wrapper-tips">拖拽至此处以完成收藏</div>
      <p class="collect__wrapper-current"></p>
      <select class="collect__wrapper-select">
        <option value="image">图片</option>
        <option value="link">链接</option>
        <option value="text">文本</option>
      </select>
      <button class="collect__wrapper-button">确定</button>
    `;

    // dragstart
    this.dragStart();
    console.log("load dragStart >>>");

    // dragenter & dragover & drop
    this.onDrop(dropzone);

    // dragend
    this.dragEnd();

    // 按钮事件
    const button = dropzone.lastElementChild;
    button.addEventListener("click", e => this.handleClick(e));

    return dropzone;
  }

  appendTo(parent) {
    if (typeof parent === "string") parent = document.querySelector(parent);
    parent.appendChild(this.element);
  }

  showDragzone() {
    // show collect box
    this.element.style.setProperty("transform", "translateX(370px)");
  }

  closeDragzone() {
    // show collect box
    this.element.style.setProperty("transform", "translateX(0px)");
  }

  dragStart() {
    // 监听拖拽 & dragstart
    document.addEventListener("dragstart", e => {
      console.log("dragStart >>>", Dragzone.isDraging);
      if (Dragzone.isDraging) {
        // show collect box
        this.showDragzone();

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

        // dragstart 收起工作台 && 展开 trigger
        // iframe.style.setProperty("transform", "translateX(-336px)");
        // trigger.style.setProperty("transform", "translateX(0px)");
      }
    });
  }

  dragEnd() {
    // 监听拖拽结束 & dragend;
    document.addEventListener("dragend", e => {
      const left = e.clientX || e.x;
      if (left > 361) {
        // close collect box
        this.closeDragzone();
        // 清空mian
        // curCollectInfo.style.display = 'none';
        // curCollectInfo.textContent = '';
      }
    });
  }

  onDrop(dropzone) {
    if (dropzone) {
      // dropzone & dragenter

      dropzone.addEventListener("dragenter", e => {
        // prevent default to allow drop & 转换为可放置区
        e.preventDefault();
      });

      dropzone.addEventListener("dragover", e => {
        // prevent default to allow drop & 转换为可放置区
        e.preventDefault();
      });

      // drop collect__wrapper

      dropzone.addEventListener("drop", e => {
        // drop in collect__wrapper

        if (Dragzone.isDraging) {
          console.log("drop in Dragzone >>>");
          const type = +e.dataTransfer.getData("origin/type");
          const title =
            document.getElementsByTagName("title")[0].textContent || "";
          const params = {
            type,
            title
          };

          // cur
          // curCollectInfo.style.display = 'block';

          switch (type) {
            case 6:
              params.remark = e.dataTransfer.getData("text");
              // curCollectInfo.textContent = e.dataTransfer.getData('text');
              break;
            case 7:
              params.remark = e.dataTransfer.getData("link");
              // curCollectInfo.textContent = e.dataTransfer.getData('link');
              break;
            case 8:
              Object.assign(params, {
                detail: { url: e.dataTransfer.getData("img") }
              });
              // curCollectInfo.textContent = e.dataTransfer.getData('img');
              break;
            default:
              params.type = 0;
              break;
          }

          Dragzone.isDraging = false;
          console.log("do something .......", Dragzone.isDraging);
        }
      });
    }
  }

  handleClick() {
    console.log("handle click >>>");
    this.closeDragzone();
    // 只做 postMessage 事件
    // postMessage to iframe

    // iframe.contentWindow.postMessage(
    //   { type: "createCollect", to: "iframe", data: params },
    //   "*"
    // );
    Dragzone.isDraging = true;
  }

  static setStyles() {
    if (Dragzone.styles) return;
    Dragzone.styles = true;
  }
}
