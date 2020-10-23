<template lang="pug">
.xmind-contextmenu
  //- div
  //-   a(:class="{disabled:!props.node && !props.nodes}" @click="onTop()") 置顶
  //- div
  //-   a(:class="{disabled:!props.node && !props.nodes}" @click="onBottom()") 置底
  //- .line
  div(v-if="props.nodes")
    a(@click="onCombine()") 组合
    div
      a(@click="onCombine(true)") 包含
  div(v-if="props.node && props.node.name === 'combine'")
    a(@click="onUncombine()") 取消组合/包含
  .line(v-if="props.nodes")
  div
    a(:class="{disabled:!props.node && !props.nodes}"
        @click="onLock()") {{ props.locked ? '解锁' : '锁定' }}
  .line
  div
    a(:class="{disabled:!props.node && !props.nodes && !props.line}" @click="onDel()") 删除
  .line
  div
    a(@click="canvas.undo()")
      span 撤销
      span Ctrl + Z
  div
    a(@click="canvas.redo()") 
      span 恢复
      span Ctrl + Shift+ Z
  .line
  div
    a(@click="canvas.cut()")
      span 剪切
      span Ctrl + X
  div
    a(@click="canvas.copy()") 
      span 复制
      span Ctrl + C
  div
    a(@click="canvas.parse()")
      span 粘贴
      span Ctrl + V
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    canvas: {
      type: Object,
      require: true,
    },
    props: {
      type: Object,
      require: true,
    },
  },
  methods: {
    onTop() {
      if (this.props.node) {
        this.canvas.top(this.props.node)
      }

      if (this.props.nodes) {
        for (const item of this.props.nodes) {
          this.canvas.top(item)
        }
      }

      this.canvas.render()
    },

    onBottom() {
      if (this.props.node) {
        this.canvas.bottom(this.props.node)
      }

      if (this.props.nodes) {
        for (const item of this.props.nodes) {
          this.canvas.bottom(item)
        }
      }

      this.canvas.render()
    },

    onCombine(stand) {
      if (!this.props.nodes) {
        return
      }
      this.canvas.combine(this.props.nodes, stand)
      this.canvas.render()
    },

    onUncombine() {
      if (!this.props.node) {
        return
      }
      this.canvas.uncombine(this.props.node)
      this.canvas.render()
    },

    onLock() {
      this.props.locked = !this.props.locked
      if (this.props.node) {
        this.props.node.locked = this.props.locked
      }
      if (this.props.nodes) {
        for (const item of this.props.nodes) {
          item.locked = this.props.locked
        }
      }
      if (this.props.lines) {
        for (const item of this.props.lines) {
          item.locked = this.props.locked
        }
      }
      this.canvas.render(true)
    },

    onDel() {
      this.canvas.delete()
    },
  },
}
</script>

<style lang="less">
.xmind-contextmenu {
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  width: 200px;
  text-align: left;

  & > div {
    padding: 4px 16px;
    a {
      display: block;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: "#409eff";
      }
      &.disabled {
        color: "#c0c4cc";
        cursor: default;
      }
    }
  }

  .line {
    padding: 0;
    border-top: 1px solid "#dcdfe6";
  }
}
</style>
