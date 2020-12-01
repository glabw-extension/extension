<!--
 * @Author: xq
 * @Date: 2020-10-23 15:00:54
 * @LastEditTime: 2020-12-01 19:30:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/Plugin.vue
-->
<template lang="pug">
#glab_plugin(ref="plugin")
  work-station
  router-view
  #open_sider(@click.stop="handleClick")
    .expand_icon(:style="{backgroundImage: `url(${expand_icon})`}")
</template>

<script>
import workStation from "@/views/work-station/index.vue";
import api from "@/data/api";
import store from "@/services/store";
import { v4 as uuidv4 } from "uuid";
import expand_icon from "@/assets/workplace/expand.svg";

export default {
  components: {
    workStation
  },
  data() {
    return {
      expand_icon
    };
  },
  created() {},
  mounted() {
    window.addEventListener("message", this.createCollect);
    // clear
  },
  methods: {
    async createCollect(event) {
      const { type, to, data = {} } = event.data;
      if (type === "createCollect" && to === "iframe") {
        console.log("createCollect >>", data);

        const { type, title = "", remark = "", detail = {} } = data;
        const query = {
          type, // 6:text, 7:link, 8:img
          collectionKey: uuidv4(),
          title, // img link text :tag name
          remark, // img:url, link, text
          detail
        };

        try {
          parent.postMessage(
            { type: "collectCreated", to: "content", status: "pending" },
            "*"
          );
          const { id = 0 } = await api.createCollection(query);

          if (id) {
            store.set("upDateCollectionList", true);
          }
        } catch (error) {
          console.log(error);
          parent.postMessage(
            { type: "collectCreated", to: "content", status: "done" },
            "*"
          );
        } finally {
          // post message
          parent.postMessage(
            { type: "collectCreated", to: "content", status: "done" },
            "*"
          );
        }
      }
    },
    handleClick() {
      document.querySelector("#glab_plugin").classList.remove("hide_sider");
    }
  }
};
</script>

<style lang="less">
#open_sider {
  display: none;
  position: fixed;
  left: 0;
  top: 10px;
  padding: 6px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  .expand_icon {
    width: 20px;
    height: 20px;
  }
}
.hide_sider #open_sider {
  display: block;
}
.hide_sider #workplace {
  display: none;
}
</style>
 