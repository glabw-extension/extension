<!--
 * @Author: your name
 * @Date: 2020-10-23 15:00:54
 * @LastEditTime: 2020-11-27 10:21:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/Plugin.vue
-->
<template>
 <div id="glab_plugin" ref="plugin">
    <!-- <router-view /> -->
    <work-station></work-station>
  </div>
</template>

<script>
import workStation from "@/views/work-station/index.vue";
import api from "@/data/api";
import store from "@/services/store";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    workStation
  },
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
    }
  }
};
</script>
