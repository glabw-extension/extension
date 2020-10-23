<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    // browser.runtime.sendMessage({});
    console.log("browser >>>", browser);
  },
  computed: {
    defaultText() {
      return "";
    }
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
