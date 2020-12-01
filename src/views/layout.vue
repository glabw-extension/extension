<!--
 * @Author: your name
 * @Date: 2020-11-26 15:39:21
 * @LastEditTime: 2020-11-30 19:53:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/layout.vue
-->
<template lang="pug">
.plugin_layout
  .header
    .header-expand()
      .header-expand_icon(@click.stop="handleExpand" :style="{maskImage: `url(${expand_icon})`}")
    accountInfo.header-container
  |
  router-view.container
  
</template>

<script>
import expand_icon from "@/assets/workplace/expand.svg";
import accountInfo from "@/components/account-info";

export default {
  components: {
    accountInfo
  },
  data() {
    return { expand_icon };
  },
  methods: {
    handleExpand() {
      if (parent.window === window) {
        this.expand = !this.expand;
      } else {
        // postMessage 转发给 content.js
        parent.postMessage(
          { type: "workstation", to: "content", close: true },
          "*"
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.plugin_layout {
  height: 100%;
  position: relative;
  z-index: 999;
  .header {
    display: flex;
    width: 100%;
    height: 48px;
    background-color: #fff;
    &-expand {
      width: 48px;
      padding: 14px;
      &_icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-color: #808695;
      }
    }
  }
  .container {
    background-color: #f8f8f8;
    height: 100%;
  }
}
</style>