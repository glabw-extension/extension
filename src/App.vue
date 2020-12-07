 
<template lang="pug">
#app(:style="appStyle")
  workStation
  //- #glab_open_trigger(@click.stop="handleClick")
    .expand_icon(:style="{backgroundImage: `url(${expand_icon})`}")
</template>
<script>
import Vue from "vue";
import store from "@/services/store";
import workStation from "@/views/work-station/index.vue";
import expand_icon from "@/assets/workplace/expand.svg";

export default {
  components: { workStation },
  data() {
    return {
      expand_icon,
      visible: false
    };
  },
  computed: {
    appStyle() {
      return this.visible ? { width: "336px" } : { width: "336px" };
    }
  },
  created() {
    Vue.prototype.$closePlugin = () => {
      console.log("$closePlugin >>>>>>>>>>");

      // 收起 wrapper
      const wrapper = document.querySelector("#glab_workstation_extension_wrapper");
      wrapper &&
        wrapper.style.setProperty("transform", "translateX(0px)", "important");

      // 展开 trigger
      const trigger = document.querySelector("#glab_open_trigger");
      trigger &&
        trigger.style.setProperty("transform", "translateX(0px)", "important");
    };
  },
  mounted() {
    // 保证 vue 实例挂载成功
    window.postMessage(
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
  },
  methods: {
    handleClick() {}
  }
};
</script>
<style lang="less">
#app {
  margin: 0;
  width: auto;
  overflow: auto;
  height: 100%;
  background-color: white;
}

.hide_sider #open_sider {
  display: block;
}
.hide_sider #workStation {
  display: none;
}
</style>
 