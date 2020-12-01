<!--
 * @Author: your name
 * @Date: 2020-11-30 15:58:02
 * @LastEditTime: 2020-12-01 11:06:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/area/index.vue
-->

<template lang="pug">
#extension_area(:style="display")
  .max-space
    div area
    div area
</template>

<script>
import store from "@/services/store";

export default {
  data() {
    return {
      visiable: false
    };
  },
  computed: {
    display() {
      return this.visiable ? { display: "block" } : { display: "none" };
    }
  },

  mounted() {
    store.$on("displayExtensionAreaChange", visiable => {
      this.visiable = visiable;

      visiable
        ? (() => {
            document.body.classList.add("workstation-full-page");
            parent.postMessage(
              { type: "fullpage", to: "content_script", fullpage: visiable },
              "*"
            );
          })()
        : (() => {
            document.body.classList.remove("workstation-full-page");
            parent.postMessage(
              { type: "unfullpage", to: "content_script", fullpage: visiable },
              "*"
            );
          })();
    });
  },
  methods: {
    show() {
      this.visiable = true;
    },
    close() {
      this.visiable = false;
    }
  }
};
</script>

<style lang="less" scoped>
#extension_area {
  position: fixed;
  transform: translate3d(0, 0, 0);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  .max-space {
    height: 100%;
    margin-left: 336px;
    position: relative;
    background-color: #d9d9d9;
  }
}
</style>
<style  >
body .workstation-full-page {
  width: 100%;
}
</style>