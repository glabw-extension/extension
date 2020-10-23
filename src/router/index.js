import Vue from "vue";
import VueRouter from "vue-router";
import mindMap from "../views/mind-map/index";

Vue.use(VueRouter);

const mindMapRoutes = [
  {
    name: "workstation.mindMap",
    path: "/workstation/mindMap/:id?",
    component: mindMap.main
  }
];
const router = new VueRouter({
  routes: [...mindMapRoutes]
});

export default router;
