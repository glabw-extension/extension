import Vue from "vue";
import App from "./App.vue";
// import router from "./router";
// import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.less";
import "@/data/interceptors";
import "@/directives";
import dayjs from "dayjs";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "mini"
});

Vue.prototype.$dayjs = dayjs;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");

new Vue({
  render: h => h(App)
}).$mount("#glab_workstation_extension_wrapper #glab_app_ext");

console.log("=============>>>>> myPlugin is running");
