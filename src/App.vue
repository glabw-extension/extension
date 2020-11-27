<!--
 * @Author: xq
 * @Date: 2020-10-28 18:40:02
 * @LastEditTime: 2020-11-26 19:39:57
 * @LastEditors: Please set LastEditors
 * @Description: plugin app
 * @FilePath: /extension/src/App.vue
-->
<template lang="pug">
#app
  layout
</template>
<script>
import layout from "@/views/layout.vue";
export default {
  components: { layout },
  mounted() {
    // send message to background to tell itrame is mounted
    parent &&
      parent.postMessage(
        { type: "mounted", to: "content", iframeLoaded: true },
        "*"
      );
  }
};
</script>
<style lang="scss">
#app {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
}
</style>
