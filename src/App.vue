<template>
  <div id="app" ref="app">
    <router-view class="test" />
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
    // send message to background to tell itrame is mounted
    parent.postMessage(
      { type: "mounted", to: "content", iframeLoaded: true },
      "*"
    );

    // get dragend message

    window.addEventListener("message", this.createCollect);
    // clear

    // const app = this.$refs.app;
    // document.addEventListener('dragenter', (e) => {
    //   window.top.postMessage({ drag: "dragstart" }, "*");
    //   console.log(e,'dragenter ====>');
    // })
    // app.addEventListener('click', () => {
    //   console.log('click ====>');
    // })
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
