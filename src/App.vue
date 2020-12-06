<!--
 * @Author: xq
 * @Date: 2020-10-28 18:40:02
 * @LastEditTime: 2020-12-01 15:57:06
 * @LastEditors: Please set LastEditors
 * @Description: plugin app
 * @FilePath: /extension/src/App.vue
-->
<template lang="pug">
#app(:style="appStyle")
  router-view
  //- layout
  //- extensionArea
</template>
<script>
import layout from "@/views/layout.vue";
import extensionArea from "@/views/area";
import store from "@/services/store";

export default {
  components: { layout, extensionArea },
  data () {
    return {
      fullPage: false
    };
  },
  computed: {
    appStyle () {
      return this.fullPage ? { width: "100%" } : { width: "336px" };
    }
  },
  mounted () {
    // send message to background to tell itrame is mounted
    parent &&
      parent.postMessage(
        { type: "mounted", to: "content", iframeLoaded: true },
        "*"
      );

    // fullpage
    store.$on("fullPageChange", fullPage => {
      this.fullPage = fullPage;
      fullPage
        ? (() => {
          // document.body.classList.add("workstation-full-page");
          parent.postMessage(
            { type: "fullpage", to: "content_script", fullpage: fullPage },
            "*"
          );
        })()
        : (() => {
          // document.body.classList.remove("workstation-full-page");
          parent.postMessage(
            { type: "unfullpage", to: "content_script", fullpage: fullPage },
            "*"
          );
        })();
    });
  }
};
</script>
<style lang="scss">
#app {
  margin: 0;
  width: 336px;
  overflow: auto;
  height: 100%;
  background-color: white;
}
</style>
