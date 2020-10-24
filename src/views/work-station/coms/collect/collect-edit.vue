<template lang="pug">
.collect-edit(:class="{'show-detail': show}" v-loading="loading")
  .collect-edit-content
    h1.collect-edit-title.ellipsis {{(curCollect || {}).title}}
    hr
    #collect-edit-editor
    el-button.mt-20(@click="save" type="primary") 保存
    el-button.mt-20(@click="cancel") 取消

</template>
<script>
import Editor from 'wangeditor'
import store from '@/services/store'
import api from '@/data/api'
export default {
  name: 'collectEdit',
  data() {
    return {
      show: false,
      curCollect: null,
      editor: null,
      loading: false
    }
  },
  mounted () {
    store.$on('showCollectDetailChange',(res) => {
      this.show = res.showDetail
      this.curCollect = res.curCollect
      parent.postMessage(
        { type: "workstation", to: "content", fullpage: res.showDetail },
        "*"
      );
      const curCollect = this.curCollect || {}
      let domStr
      if(curCollect.type === 8) {
        domStr = `<img src="${curCollect.detail && curCollect.detail.url}" ></img>`
      } else if(curCollect.type === 7) {
        domStr = `<a href="${curCollect.remark}">${curCollect.remark}</a>`
      } else {
        domStr = `<p>${curCollect.remark}</p>`
      }
      console.log(domStr,'domStr');

      this.editor.txt.html(`${domStr}`)
    })
    const curCollect  = this.curCollect || {}
    console.log(curCollect,'curCollect');
    const editor = new Editor('#collect-edit-editor');
    this.editor = editor
    editor.config.uploadImgServer = 'https://www.workstation.com/file/upload'
    editor.config.height = 560
    editor.create()
  },
  methods: {
    save() {
      const curCollect = this.curCollect || {}
      const params = Object.assign(curCollect)
      const text = this.editor.txt.text()
      if(curCollect.type === 8) {
        const img = this.editor.txt.html()
        let doc = new DOMParser().parseFromString(img, 'text/html');
        console.log(doc.querySelector('img').src,'doc');
        params.detail.url =  doc.querySelector('img').src
      } else if(curCollect.type === 7) {
        params.remark = text
      } else {
        params.remark = text
      }
      this.loading = true
      api.updateCollection(params).then(() => {
        this.$message.success('编辑成功')
        store.set('showCollectDetail',{showDetail: false,curCollect: null})
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.$message.error('编辑失败')
      })
    },
    cancel() {
      store.set('showCollectDetail',{showDetail: false,curCollect: null})
    }
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
  // #collect-edit-editor {
  //   height: calc(100% - 100px);
  // }
}
.show-detail {
  display: block;
}
</style>