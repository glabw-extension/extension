<template lang="pug">
.collect-edit(:class="{'show-detail': show}")
  .collect-edit-content
    h1.collect-edit-title.ellipsis {{(curCollect || {}).title}}
    hr
    #collect-edit-editor


</template>
<script>
// import Editor from 'wangeditor'
import store from '@/services/store'
export default {
  name: 'collectEdit',
  data() {
    return {
      show: false,
      curCollect: null
    }
  },
  mounted () {
    store.$on('showCollectDetailChange',(res) => {
      // console.log(show, curCollect, 'collect-detail');
      this.show = res.showDetail
      this.curCollect = res.curCollect
    })
    // const curCollect  = this.curCollect || {}
    // const editor = new Editor('#collect-edit-editor');
    // editor.config.height = 500
    // editor.create()
    // let detailDom
    // if(curCollect.type === 8) {
    //   detailDom = document.createElement('img')
    //   detailDom.src = 'curCollect.detail.url'
    // } else if(curCollect.type === 7) {
    //   detailDom = document.createElement('p')
    //   detailDom.innerHTML = curCollect.remark
    // } else if(curCollect.type === 6) {
    //   detailDom = document.createElement('a')
    //   detailDom.src = curCollect.remark
    // } else {
    //   detailDom = document.createElement('p')
    //   detailDom.innerHTML = curCollect.remark
    // }
    // editor.txt.append(detailDom)
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