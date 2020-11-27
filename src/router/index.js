import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login";
import plugin from "@/views/plugin";
import mindMap from "@/views/mind-map/index";
import layout from "@/views/layout";

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

const pluginRoutes = [
  {
    name: "plugin",
    path: "/plugin",
    component: plugin.main
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
  routes: [
    ...loginRoutes,
    {
      path: "/",
      redirect: {
        name: "ssl-login"
      },
      component: layout
      // children: [...pluginRoutes, ...mindMapRoutes]
    },
    ...pluginRoutes,
    ...mindMapRoutes
  ]
});

export default router;
