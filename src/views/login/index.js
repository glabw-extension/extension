export default {
  ssl: () => import(/* webpackChunkName: "login" */ "./sslLogin.vue"),
  login: () => import(/* webpackChunkName: "login" */ "./login.vue")
};
