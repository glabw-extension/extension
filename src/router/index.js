import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import mindMap from '../views/mind-map/index'
console.log(mindMap);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const mindMapRoutes = [
  {
    name: 'workstation.mindMap',
    path: '/workstation/mindMap/:id?',
    component: mindMap.main,
  },
]
const router = new VueRouter({
  routes: [
    ...mindMapRoutes,
    ...routes,
  ]
});

export default router;
