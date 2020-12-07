<template lang="pug">
.xmind-workspace(v-loading="loading")
  .xmind-workspace__left(:class="{'close': !openAside}")
    .tools
      .tools-item(v-for="(item, index) in tools" :key="index")
        .title {{ item.group }}({{item.children.length}})
        .buttons 
          div.buttons-item(v-for="(btn, i) in item.children"
            :key="i"
            :title="btn.data.text"
            :draggable="btn.data"
            @dragstart="onDrag($event, btn)")
            i(:class="`iconfont-mindmap ${btn.icon}`")
          div.buttons-item.flex-placeholder
          div.buttons-item.flex-placeholder
          div.buttons-item.flex-placeholder
          div.buttons-item.flex-placeholder
  //- .left-side__arrow(@click.stop="openAside = !openAside", :class="{'arrow-to-left': !openAside}")
    i(:class="`el-icon-arrow-${openAside ? 'left' : 'right' }`")
  .xmind-workspace__content
    .xmind-workspace__container(ref="xmind-container")
      .top-opration
        el-button(type="primary" @click="handleSavePng") 另存为图片
        el-button(type="primary" @click="canvas.fitView(50)") 适应窗口大小
        el-popover.mr-20(trigger="hover" width="200" popper-class="xmind-scale-popper")
          .text-right
            span.mr-20 {{scale}}%
            el-button(type="text" icon="el-icon-minus" :disabled="scale <= 25"  @click="scaleCanvas(-0.1)")
            el-button.mr-10(type="text" icon="el-icon-plus" :disabled="scale >= 500"  @click="scaleCanvas(+0.1)")
            el-button(@click="scaleCanvas()") 重置
          .top-opration__scale.ml-20(slot="reference") 视图：{{scale}}%
        div 背景网格：
        el-switch(v-model="showGrid" @change="showGridChange") 
        .top-opration__right
          el-button(type="primary" @click="showSaveDialog") 保存
          el-button(@click="clearMindMap") 清空
      #topology-canvas(@contextmenu="onContextMenu($event)")
      .context-menu(v-if="contextmenu.left" :style="contextmenu")
        CanvasContextMenu(:canvas="canvas" :props.sync="choosedElement")
    .xmind-workspace__right
      CanvasProps(:props.sync="choosedElement" @change="onUpdateProps")
  el-dialog(title="保存脑图" :visible.sync="mindModel" width="500px"  v-loading="loading")
    el-form(:model="form" ref="form" label-width="60px" label-suffix=":")
      el-form-item(label="名称" prop="title" :rules="[{required: true, message: '思维导图名称不能为空'}]")
        el-input(v-model="form.title" placeholder="请输入名称" :maxlength="100")
      el-form-item(label="备注" prop="remark")
        el-input(v-model="form.remark" type="textarea" placeholder="请输入备注" :maxlength="100" show-word-limit)
    template(v-slot:footer)
      el-button(@click="mindModel = false") 取消
      el-button(@click="saveXmind" type="primary" :disabled="!form.title") 保存
</template>

<script>
import { Topology } from "@topology/core";
// import * as FileSaver from 'file-saver'
import { Tools } from "./xmind-config";
import CanvasProps from "./CanvasProps";
import CanvasContextMenu from "./CanvasContextMenu";
import api from "@/data/api";
import store from "@/services/store";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import { register as registerFlow } from "@topology/flow-diagram"; // 注册流程图相关图示
import { v4 as uuidv4 } from "uuid";
import { throttle } from "lodash-es";

export default {
  name: "XmindWorkspace",
  components: {
    CanvasProps,
    CanvasContextMenu
  },
  data() {
    return {
      tools: Tools,
      choosedElement: {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      },
      contextmenu: {
        left: null,
        top: null,
        bottom: null
      },
      canvasOptions: {
        disableEmptyLine: true,
        // hideRotateCP: true,
        dragColor: "#409eff",
        activeColor: "#409eff"
        // rotateCursor: require('../../assets/workplace/no-data-gray.svg')
      },
      canvas: null,
      mindId: null,
      mindType: 1, // 1：脑图；2：脑图模版（战法库）；
      eventId: null,
      loading: false,
      mindModel: false,
      form: {
        remark: "",
        title: ""
      },
      showGrid: false,
      openAside: true
    };
  },
  computed: {
    scale() {
      return Math.floor((this.canvas && this.canvas.data.scale) * 100);
    }
  },
  watch: {
    $route() {
      // 重新加载路由要重新获取路由参数
      this.mindId = this.$route.params.id;
      this.eventId = this.$route.query.event_id;
      const newToDetail = this.$route.query.newToDetail;
      this.choosedElement = {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      };
      if (this.mindId) {
        !newToDetail && this.getMindDetail();
      } else {
        this.form.remark = "";
        this.form.title = "";
        this.canvas.open();
      }
    }
  },
  mounted() {
    registerFlow();
    this.initPage();
    this.contextmenuHiddenHandle();
    this.mindMapResizeHandle();
    this.freshHandle();
  },
  beforeDestroy() {
    this.canvas.destroy();
    document.onclick = null;
    window.onbeforeunload = null;
  },
  methods: {
    initPage() {
      this.canvasOptions.on = this.onMessage;
      this.canvas = new Topology("topology-canvas", this.canvasOptions);
      this.canvas.data.lineName = "mind";
      this.canvas.data.fromArrowType = "";
      this.canvas.data.toArrowType = "";
      this.mindId = this.$route.params.id;
      this.mindType = this.$route.query.type || 1;
      this.eventId = this.$route.query.event_id || "1";
      if (this.mindId) {
        this.getMindDetail();
      }
    },
    clearMindMap() {
      this.canvas.open();
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.resetFields();
      });
      this.choosedElement = {
        node: null,
        line: null,
        nodes: null,
        multi: false,
        locked: false
      };
    },
    // 左侧收起时重置canvns大小
    mindMapResizeHandle() {
      const mindMap = this.$refs["xmind-container"];
      const ResizeObserver = window.ResizeObserver || Polyfill;
      const ro = new ResizeObserver(
        throttle(() => {
          this.canvas.resize();
        }, 20)
      );
      ro.observe(mindMap);
    },
    showGridChange() {
      this.canvas.data.grid = this.showGrid;
      this.canvas.showGrid(this.showGrid);
      this.onUpdateProps();
    },
    scaleCanvas(value) {
      if (value) {
        let scale;
        if (this.canvas.data.scale >= 4.9 && value > 0) {
          scale = 5;
        } else if (this.canvas.data.scale <= 0.35 && value < 0) {
          scale = 0.25;
        } else {
          scale = this.canvas.data.scale + value;
        }
        this.canvas.scaleTo(scale);
      } else {
        this.canvas.scaleTo(1);
      }
    },
    showSaveDialog() {
      this.mindModel = true;
      if (!this.mindId) {
        // 新建的时候要清空表单，但是会触发title校验
        this.$nextTick(() => {
          this.$refs.form.clearValidate("title");
        });
      }
    },
    contextmenuHiddenHandle() {
      document.onclick = () => {
        this.contextmenu = {
          left: null,
          top: null,
          bottom: null
        };
      };
    },
    async getMindDetail() {
      const params = {
        id: this.mindId,
        type: this.mindType,
        event_id: this.eventId
      };
      this.loading = true;
      try {
        const data = await api.getMindById(params);
        this.loading = false;
        this.form.title = data.title;
        this.form.remark = data.remark;
        this.showGrid = data.detail.grid;
        data && this.canvas.open(data.detail);
      } catch (error) {
        this.loading = false;
      }
    },
    onDrag(event, node) {
      event.dataTransfer.setData("Topology", JSON.stringify(node.data));
    },
    onMessage(event, data) {
      // console.log('onMessage', event, data)
      // 右侧输入框编辑状态时点击编辑区域其他元素，onMessage执行后才执行onUpdateProps方法，通过setTimeout让onUpdateProps先执行
      setTimeout(() => {
        switch (event) {
          case "node":
          case "addNode":
            this.choosedElement = {
              node: data,
              line: null,
              multi: false,
              nodes: null,
              locked: data.locked
            };
            break;
          case "line":
          case "addLine":
            this.choosedElement = {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            };
            break;
          case "multi":
            this.choosedElement = {
              node: null,
              line: null,
              multi: true,
              nodes: data.length > 1 ? data : null,
              locked: this.getLocked({ nodes: data })
            };
            break;
          case "space":
            this.choosedElement = {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            };
            break;
          case "moveOut":
            break;
          case "moveNodes":
          case "resizeNodes":
            if (data.length > 1) {
              this.choosedElement = {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              };
            } else {
              this.choosedElement = {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              };
            }
            break;
          case "resize":
          case "scale":
          case "locked":
            // if (this.canvas && this.canvas.data) {
            //   this.$store.commit('canvas/data', {
            //     scale: this.canvas.data.scale || 1,
            //     lineName: this.canvas.data.lineName,
            //     fromArrowType: canvas.data.fromArrowType,
            //     toArrowType: canvas.data.toArrowType,
            //     fromArrowlockedType: canvas.data.locked
            //   });
            // }
            break;
        }
      }, 0);
    },
    getLocked(data) {
      let locked = true;
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false;
            break;
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false;
            break;
          }
        }
      }

      return locked;
    },
    onUpdateProps(node) {
      // 如果是node属性改变，需要传入node，重新计算node相关属性值
      // 如果是line属性改变，无需传参
      this.canvas.updateProps(node);
    },
    handle_open(data) {
      this.handle_replace(data);
    },
    handle_replace() {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = event => {
        const elem = event.srcElement || event.target;
        if (elem.files && elem.files[0]) {
          // const name = elem.files[0].name.replace('.json', '')
          const reader = new FileReader();
          reader.onload = e => {
            const text = e.target.result + "";
            try {
              const data = JSON.parse(text);
              this.canvas.open(data);
            } catch (e) {
              return false;
            }
          };
          reader.readAsText(elem.files[0]);
        }
      };
      input.click();
    },
    freshHandle() {
      window.onbeforeunload = e => {
        if (!this.mindId) {
          if (e) e.returnValue = "关闭提示";
          return "关闭提示";
        }
      };
    },
    // handle_save(data) {
    //   console.log('save')
    //   FileSaver.saveAs(
    //     new Blob([JSON.stringify(this.canvas.data)], {
    //       type: 'text/plain;charset=utf-8',
    //     }),
    //     `le5le.topology.json`,
    //   )
    // },
    handleSavePng(data) {
      const name = (this.form.title || "未命名") + (data.ext || ".png");
      this.canvas.saveAsImage(name, 50, data.type, data.quality);
    },
    onContextMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      if (!event.ctrlKey) {
        if (event.clientY + 360 < document.body.clientHeight) {
          this.contextmenu = {
            left: event.clientX + "px",
            top: event.clientY + "px"
          };
        } else {
          this.contextmenu = {
            left: event.clientX + "px",
            bottom: document.body.clientHeight - event.clientY + "px"
          };
        }
      }
    },
    saveXmind() {
      console.log(this.canvas.toImage);
      this.canvas.toImage(50, "png", null, async blob => {
        this.loading = true;
        let file_path;
        if (blob) {
          // 生成图片成功才上传
          const formData = new FormData();
          const name = uuidv4();
          const blob_file = new File([blob], `${name}.png`);
          formData.append("file", blob_file);
          try {
            file_path = (await api.upLoadImg(formData)) || {};
          } catch (error) {
            this.loading = false;
            console.log(error);
          }
        } else {
          file_path = ""; // 新建一个空的脑图，blob为null
        }

        const params = {
          event_id: this.eventId,
          detail: this.canvas.data,
          remark: this.form.remark,
          title: this.form.title,
          type: this.mindType,
          imageUrl: file_path
        };
        if (this.mindId) {
          params.id = this.mindId;
          api
            .updateMindById(params)
            .then(() => {
              store.set("upDateMindMapList", true);
              this.$message.success("编辑成功");
              this.mindModel = false;
              this.loading = false;
            })
            .catch(() => {
              this.$message.error("编辑失败");
              this.loading = false;
            });
        } else {
          api
            .createMind(params)
            .then(res => {
              store.set("upDateMindMapList", true);
              this.$message.success("新建成功");
              this.mindModel = false;
              this.loading = false;
              // 新建之后当前页面变成编辑页面
              this.$router.replace({
                params: { id: res.id },
                query: { event_id: this.eventId, newToDetail: true }
              });
            })
            .catch(() => {
              this.$message.error("新建失败");
              this.loading = false;
            });
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.mindId) {
      this.$confirm("当前页面数据未保存，确定离开？", {
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  }
};
</script>

<style lang="less">
.xmind-workspace {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 24px;
  background: #f0f1f4;
  .xmind-workspace__left {
    width: 320px;
    height: 100%;
    flex-shrink: 0;
    border-radius: 8px;
    transition: all 0.5s;
    background-color: #fff;
    .tools {
      height: 100%;
      padding: 16px 24px;
      overflow-y: auto;
    }
    .title {
      font-size: 16px;
      padding-bottom: 16px;
      margin-top: 20px;
      border-bottom: 1px solid #ddd;
      &:first-child {
        margin-top: 0;
        border-top: none;
      }
    }
    .buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 0;
      .buttons-item {
        text-align: center;
        line-height: 60px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        .iconfont-mindmap {
          font-size: 60px;
        }
        &:hover {
          color: #409eff;
        }
        &.flex-placeholder {
          height: 0;
        }
      }
    }
  }
  .left-side__arrow {
    position: absolute;
    left: 344px;
    top: 50%;
    transform: translateY(-33px);
    width: 16px;
    height: 66px;
    cursor: pointer;
    transition: all 0.5s;
    &:before {
      position: absolute;
      content: "";
      width: 16px;
      height: 66px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 16px solid #fff;
    }
    i {
      position: absolute;
      font-size: 16px;
      top: 25px;
    }
  }
  .arrow-to-left {
    left: 0;
  }
  .close {
    margin-left: -344px;
  }
  .xmind-workspace__content {
    display: flex;
    flex: 1;
    margin-left: 24px;
    padding: 16px 0 16px 24px;
    background-color: #fff;
    border-radius: 8px;
  }
  .xmind-workspace__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: 24px;
    border-right: 1px solid #d9d9d9;
    .top-opration {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      &__right {
        margin-left: auto;
      }
    }
    #topology-canvas {
      flex: 1;
      position: relative;
      border: 1px solid #dcdfe6;
      /** 适应窗口大小会出现滚动条，默认的挂载元素加了overflow：auto */
      overflow: hidden !important;
    }
  }

  .xmind-workspace__right {
    width: 320px;
    overflow-y: auto;
    position: relative;
    padding: 0 24px;
  }

  .context-menu {
    position: fixed;
    z-index: 10;
  }
}
.xmind-scale-popper {
  .el-button--text {
    color: #606266;
  }
}
</style>
