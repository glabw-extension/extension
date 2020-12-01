<!--
 * @Author: xq
 * @Date: 2020-10-28 18:40:02
 * @LastEditTime: 2020-11-30 19:50:10
 * @LastEditors: Please set LastEditors
 * @Description: plugin app
 * @FilePath: /extension/src/App.vue
-->
<template lang="pug">
#app
  layout
  extensionArea
</template>
<script>
import layout from "@/views/layout.vue";
import extensionArea from "@/views/area";

export default {
  components: { layout, extensionArea },
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
  margin: 0;
  width: 336px;
  overflow: auto;
  height: 100%;
}
</style>
