<template>
  <div id="app" ref="app">
    <router-view class="test" />
    <work-station></work-station>
  </div>
</template>
<script>
import workStation from "@/views/work-station/index.vue";
export default {
  components: {
    workStation
  },
  mounted() {
    // send message to background to tell itrame is mounted
    parent.postMessage(
      { type: "mounted", to: "content", iframeLoaded: true },
      "*"
    );
    // const app = this.$refs.app;
    // document.addEventListener('dragenter', (e) => {
    //   window.top.postMessage({ drag: "dragstart" }, "*");
    //   console.log(e,'dragenter ====>');
    // })
    // app.addEventListener('click', () => {
    //   console.log('click ====>');
    // })
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.test {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: pink;
}
</style>
