<template lang="pug">
.collect-edit(:class="{'show-detail': show}")
  .collect-edit-content
    h1.collect-edit-title.ellipsis {{curCollect.title}}
    hr
    #collect-edit-editor


</template>
<script>
import Editor from 'wangeditor'
export default {
  name: 'collectEdit',
  props: {
    curCollect: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      default: false
    },
  },
  mounted () {
    const editor = new Editor('#collect-edit-editor');
    console.log(editor,11111111);
    editor.config.height = 500
    editor.create()
  },
}
</script>
<style lang="less" scoped>
.collect-edit {
  display: none;
  position: fixed;
  margin-left: 336px;
  left: 0;
  top: 0;
  height: 100%;
  width: calc(100% - 336px);
  z-index: 1;
  padding-left: 20px;
  display: none;
  background: #f0f1f4;
  &-content {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 10px;
  }
}
.show-detail {
  display: block;
}
</style>