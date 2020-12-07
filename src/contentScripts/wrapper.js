/*
 * @Author: your name
 * @Date: 2020-11-30 15:17:16
 * @LastEditTime: 2020-12-07 15:41:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/contentScripts/wrapper.js
 */
export default class Wrapper {
  static isDraging = true;

  constructor() {
    // #glab_workstation_extension_wrapper
    this.wrapper = this.createWrapper();
  }

  createWrapper() {
    if (this.wrapper) return this.wrapper;
    const div = document.createElement("div");
    div.id = "glab_workstation_extension_wrapper";

    // dragstart
    this.dragStart();
    console.log("load dragStart >>>");

    // dragenter & dragover & drop
    this.onDrop(div);

    // dragend
    this.dragEnd();
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

  dragStart() {
    // 监听拖拽 & dragstart
    document.addEventListener("dragstart", e => {
      console.log("dragStart >>>", Wrapper.isDraging);
      if (Wrapper.isDraging) {
        // show collect box

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

        if (Wrapper.isDraging) {
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

          Wrapper.isDraging = false;
        }
      });
    }
  }
}
