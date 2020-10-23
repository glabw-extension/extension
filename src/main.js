import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less'
import '@/data/interceptors'
import '@/directives'
import _ from 'lodash'
import dayjs from 'dayjs'


Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: 'mini',
})
Vue.prototype._ = _
Vue.prototype.$dayjs = dayjs
console.log("outer Vue>>>");
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
