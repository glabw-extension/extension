<template lang="pug">
div(@click="handleExpand") Expand
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      expand: false
    };
  },
  mounted() {
    // send message to background to tell itrame is mounted
    parent.postMessage(
      { type: "mounted", to: "content", iframeLoaded: true },
      "*"
    );
  },
  methods: {
    handleExpand() {
      this.expand = false;
      console.log("handleExpand >>>", this.expand);

      // postMessage 转发给 content.js
      parent.postMessage(
        { type: "workstation", to: "content", close: true },
        "*"
      );
    }
  }
};
</script>
