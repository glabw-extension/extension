<!--
 * @Author: your name
 * @Date: 2020-11-26 14:30:11
 * @LastEditTime: 2020-11-26 19:50:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/login/index.vue
-->
<template>
  <div>
    <div>login</div>
    <button @click="checkout">切换</button>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    checkout() {
      this.$router.replace({ name: "ssl-login" });
    },
    handleLogin() {
      this.$router.replace({ name: "plugin" });
    }
  }
};
</script>

<style lang="less" scoped>
</style>