import sslLogin from './sslLogin.vue'
import login from './login.vue'

export default {
  sslLogin,
  login
};

// export default {
//   ssl: () => import(/* webpackChunkName: "login" */ "./sslLogin.vue"),
//   login: () => import(/* webpackChunkName: "login" */ "./login.vue")
// };

