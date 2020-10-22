<template lang="pug">
.download-img
  img(v-if="src" :src="src")
  img(v-else :src="noData" title="无数据")
</template>
<script>
import api from '@self/data/api'
import noData from '@self/assets/workplace/mind_placeholder.svg'
export default {
  name: 'DownloadImg',
  props: {
    filePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      src: '',
      noData,
    }
  },
  mounted() {
    if (this.filePath && this.filePath !== ' ') {
      api.downloadImg({ file_path: this.filePath }).then(blob => {
        this.src = URL.createObjectURL(blob)
      })
    }
  },
}
</script>
<style lang="less" scoped>
.download-img,
.download-img > img {
  width: 100%;
  height: 100%;
}
</style>
