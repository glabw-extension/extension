import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import plugin from "@/views/plugin";
import mindMap from "@/views/mind-map/index";
import pageView from "@/views/pageView";

Vue.use(VueRouter);

const loginRoutes = [
  {
    name: "ssl-login",
    path: "/ssl-login",
    component: login.ssl
  },
  {
    name: "login",
    path: "/login",
    component: login.login
  }
];



const mindMapRoutes = [
  {
    name: "workstation.mindMap",
    path: "/workstation/mindMap/:id?",
    component: mindMap.main
  }
];

const router = new VueRouter({
  base: 'chrome-extension://djaginnekiiohpkpibbkabcajfbmbemk',
  routes: [
    ...loginRoutes,
    {
      path: "/",
      redirect: {
        name: "ssl-login"
      },
      component: plugin.main,
      children: [
        {
          name: "home",
          path: "/home",
          component: pageView
        },

        ...mindMapRoutes
      ]
    }

  ]
});

export default router;
