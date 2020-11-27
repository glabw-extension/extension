<template lang="pug">
.account-info
  .current-category 请登录～
  el-dropdown()
    span(class="el-dropdown-link")
      .account-avatar(:style="{backgroundImage: `url(${avatar_icon})`}")
    el-dropdown-menu(slot="dropdown")
      el-dropdown-item(@click.native="handleLogout") 退出登录

  //- el-popover(placement="top-start" width="200" trigger="hover")
    div 退出登录
    .account-avatar(slot="reference" :style="{backgroundImage: `url(${avatar_icon})`}") 
</template>

<script>
import avatar_icon from "@/assets/workplace/avatar.png";
import api from "@/data/account.js";

export default {
  data() {
    return {
      avatar_icon
    };
  },
  methods: {
    async handleLogout() {
      try {
        const logout = await api.logout();
        console.log("logout >>>", logout);
        if (logout) {
          this.$router.replace({ path: "/" });
        }
      } catch (error) {
        console.log("login failed >>>", error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.account-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  .account-avatar {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}
</style>