<!--
 * @Author: xq
 * @Date: 2020-11-26 19:48:00
 * @LastEditTime: 2020-11-30 15:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /extension/src/views/login/sslLogin.vue
-->
<template>
  <div>
    <div>login</div>
    <el-button @click="checkout">切换</el-button>
    <el-button @click="handleLogin" :loading="loading">登录</el-button>
  </div>
</template>

<script>
import api from "@/data/account.js";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    checkout() {
      this.$router.replace({ name: "ssl-login" });
    },
    async handleLogin() {
      try {
        this.loading = true;
        const { DC } = await api.getSSLConfig();
        console.log("getSSLConfig >>>", DC);

        const { token = "" } = await api.getSSLToken(DC);
        console.log("getSSLToken >>>", token);

        if (token) {
          const { auth = "" } = await api.sslLogin();
          console.log("sslLogin >>>", auth);
          if (auth) {
            this.$message.success("登录成功");
            this.$router.replace({ name: "plugin" });
          }
        }
      } catch (error) {
        console.log("login failed >>>", error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>