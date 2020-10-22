<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {},
  computed: {
    defaultText() {
      return "helloWorld";
    }
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
