/* eslint-disable vue/require-default-prop */
<template lang="pug">
.xmind-elementprops
  div.props-content(v-if="!curElement && !props.line && !props.multi")
    .props-content-title 小提示
    ul.group
      li 方向键：控制节点移动5个像素
      //- li Ctrl + 方向键：控制节点移动1个像素
      li Ctrl + 鼠标移动：移动整个画布
      li Ctrl + 鼠标滚轮：缩放
      li 添加或选中节点，右侧属性栏支持添加节点图标
  div.props-content(v-if="curElement")
    .props-content-title 外观
    el-collapse(v-model="activePropsName")
      el-collapse-item(title="样式" name="style")
        .flex
          div 线条样式
          div(v-if="curElement.type") 连线类型
        .flex
          div 
            el-select(v-model="curElement.dash" @change="onChange")
              el-option(
                v-for="(item,idx) in LinesStyle", :key="item.id",
                :label="item.label",
                :value="item.value")
          div(v-if="curElement.type")
            el-select.ml-5(v-model="curElement.name" @change="onChange")
              el-option(
                v-for="(item,idx) in Lines", :key="item.id",
                :label="item.label",
                :value="item.value")
        .flex
          div 线条颜色
          .ml-5 线条宽度（px）
        .flex
          div
            el-color-picker(v-model="curElement.strokeStyle"
              :predefine="predefineColor"
              @change="onChange")
          .ml-5
            el-input-number(v-model="curElement.lineWidth"
              controls-position="right"
              @change="onChange")
        .flex(v-if="!curElement.type")
          div 背景颜色
          div 透明度（0 - 1）
        .flex(v-if="!curElement.type")
          div
            el-color-picker(v-model="curElement.fillStyle"
              :predefine="predefineColor"
              @change="onChange")
          div
            el-input-number(v-model="curElement.globalAlpha"
              controls-position="right"
              @change="onChange"
              :min="0"
              :max="1"
              :step="0.1")
        .flex(v-if="!curElement.type")
          div 圆角（0 - 0.5）
          div 旋转（°）
        .flex(v-if="!curElement.type")
          div
            el-input-number(v-model="curElement.borderRadius"
              controls-position="right"
              @change="onChange"
              :min="0"
              :max="0.5"
              :step="0.1")
          .ml-5
            el-input-number(v-model="curElement.rotate"
              controls-position="right"
              @change="onChange"
              :min="0"
              :max="360"
              :step="5")
        .flex(v-if="curElement.type")
          div 线条箭头
        .flex(v-if="curElement.type")
          div
            el-select(v-model="curElement.toArrow" @change="onChange")
              el-option(
                v-for="(item,idx) in ToArrowType", :key="item.id",
                :label="item.label",
                :value="item.value")
      el-collapse-item(title="文字" name="font")
        .flex
          div 大小
        .flex
          div 
            el-input-number(v-model="curElement.font.fontSize"
              controls-position="right"
              @change="onChange"
              :min="0"
              :max="30"
              :step="1")
        .flex
          div 颜色
          .ml-5 背景
        .flex
          div
            el-color-picker(v-model="curElement.font.color"
              :predefine="predefineColor"
              @change="onChange")
          .ml-5
            el-color-picker(v-model="curElement.font.background"
              :predefine="predefineColor"
              @change="onChange")
        .flex
          div 倾斜
          .ml-5 加粗
        .flex
          div
            el-select(v-model="curElement.font.fontStyle" @change="onChange")
              el-option(
                v-for="(item,idx) in FontStyle", :key="item.id",
                :label="item.label",
                :value="item.value")
          .ml-5
            el-select(v-model="curElement.font.fontWeight" @change="onChange")
              el-option(
                v-for="(item,idx) in FontWeight", :key="item.id",
                :label="item.label",
                :value="item.value")
        .flex
          div 水平对齐
          .ml-5 垂直对齐
        .flex
          div
            el-select(v-model="curElement.font.textAlign" @change="onChange")
              el-option(
                v-for="(item,idx) in TextAlign", :key="item.id",
                :label="item.label",
                :value="item.value")
          .ml-5
            el-select(v-model="curElement.font.textBaseline" @change="onChange")
              el-option(
                v-for="(item,idx) in VerticalAlign", :key="item.id",
                :label="item.label",
                :value="item.value")
        .flex
          div 内容
        .flex
          div
            el-input(v-model="curElement.text"
              type="textarea"
              @input="onChange")
      el-collapse-item.props-icon(title="图标" name="icon" v-if="!curElement.type")
        .fb.fb-cross-center
          span 图标选择
          div.ml-10(@click="showIconDialog = true")
            i(v-if="curIcon" class="iconfont-mindmap" :class="curIcon.class")
            i(v-else class="el-icon-plus")
        .fb.fb-cross-center.mt-10
          span 图标大小
          el-input-number.ml-10(v-model="curElement.iconSize"
            controls-position="right"
            @change="onChange"
            :min="0"
            :max="30"
            :step="1")
        .fb.fb-cross-center.mt-10 
          span 图标颜色
          el-color-picker.ml-10(v-model="curElement.iconColor"
            :predefine="predefineColor"
            @change="onChange")
  .icon-dialog(v-show="showIconDialog")
    .icon-dialog-header
      .title 选择字体图标
      el-link(type="primary" @click="showIconDialog = false") 返回
    .icon-dialog-content
      .empty.iconitem(@click="changeIcon()") 空
      i.iconitem(v-for="(icon,idx) in Icons" :key="idx" class="iconfont-mindmap" :class="icon.class" @click="changeIcon(icon)")
      i.iconitem
      i.iconitem
</template>

<script>
import {
  Icons,
  LinesStyle,
  predefineColor,
  Lines,
  FontStyle,
  FontWeight,
  TextAlign,
  VerticalAlign,
  ToArrowType,
} from './xmind-config'

export default {
  props: {
    props: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  data() {
    return {
      nodeId: null,
      nodeIsJson: false,
      nodeData: '',
      Icons,
      Lines,
      LinesStyle,
      predefineColor,
      FontStyle,
      FontWeight,
      TextAlign,
      VerticalAlign,
      ToArrowType,
      showIconDialog: false,
      curIcon: null,
      activePropsName: ['style', 'icon', 'font'],
    }
  },
  computed: {
    curElement() {
      // 先只对节点和线做处理
      return this.props.node ? this.props.node : this.props.line
    },
  },
  updated() {
    if (!this.curElement || this.nodeId === this.curElement.id) {
      return
    }
    if (this.curElement.icon) {
      this.curIcon = this.Icons.find(
        item => item.unicode === this.curElement.icon,
      )
    } else {
      this.curIcon = null
    }
    this.nodeId = this.curElement.id
    let originData = this.curElement.data
    this.nodeIsJson = this.isJson(originData)
    this.nodeData = this.nodeIsJson
      ? JSON.stringify(originData, null, 4)
      : (this.nodeData = originData)
  },
  methods: {
    changeIcon(icon) {
      this.curIcon = icon || null
      this.curElement.iconFamily = 'iconfont-mindmap'
      this.curElement.icon = icon ? icon.unicode : ''
      this.showIconDialog = false
      this.onChange()
    },
    onChange() {
      if (this.curElement) {
        this.curElement.data = this.nodeIsJson
          ? JSON.parse(this.nodeData)
          : this.nodeData
      }
      this.$emit('change', this.curElement)
    },
    isJson(obj) {
      return (
        typeof obj === 'object' &&
        Object.prototype.toString.call(obj).toLowerCase() ===
          '[object object]' &&
        !obj.length
      )
    },
  },
}
</script>

<style lang="less">
.xmind-elementprops {
  .props-content-title {
    font-weight: bold;
    font-size: 16px;
    padding-bottom: 16px;
  }
  .group > li {
    margin-bottom: 6px;
  }
  .props-content {
    .el-icon-plus {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid "#dcdfe6";
      cursor: pointer;
      border-radius: 4px;
    }
    .iconfont-mindmap {
      font-size: 30px;
      cursor: pointer;
    }
    .flex {
      display: flex;
      // padding: 4px 10px;
      padding-bottom: 6px;
    }
    .flex > div {
      flex: 1;
    }
  }
  .icon-dialog {
    position: fixed;
    width: 319px;
    top: 96px;
    right: 24px;
    bottom: 40px;
    z-index: 2;
    background: #fff;
    .icon-dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 16px;
      font-size: 16px;
      border-bottom: 1px solid "#dcdfe6";
    }
    .icon-dialog-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 10px;
    }
    .title {
      font-weight: bold;
    }
    .empty {
      text-align: center;
      line-height: 44px;
      border: 1px solid "#dcdfe6";
    }
    .iconitem {
      width: 44px;
      height: 44px;
      cursor: pointer;
      margin-bottom: 10px;
      &:hover {
        color: "#409eff";
        border-color: "#409eff";
      }
    }
    .iconfont-mindmap {
      font-size: 44px;
    }
  }
  .el-input-number,
  .el-input {
    max-width: 126px;
  }
}
</style>
