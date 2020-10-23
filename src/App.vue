<template>
  <div id="app" ref="app">

    <el-button @click="$router.push({name: 'workstation.mindMap'})">click</el-button>
    <router-view class="test"/>
    <!-- <mind-map></mind-map> -->
  </div>
</template>
<script>
// import mindMap from '@/views/mind-map/index.vue'
export default {
  // components: {
  //   mindMap,
  // },
  mounted () {
    const app = this.$refs.app;
    document.addEventListener('dragenter', (e) => {
      window.top.postMessage({ drag: "dragstart" }, "*");
      
      console.log(e,'dragenter ====>');
    })
    app.addEventListener('click', () => {
      console.log('click ====>');
    })
  },
}
</script>
<style lang="scss">
.test {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
