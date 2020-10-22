<template>
  <div>
    <hello-world />
    sidebar
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: { HelloWorld }
};
</script>

<style>
html {
  width: 500px;
  height: 400px;
}
</style>
