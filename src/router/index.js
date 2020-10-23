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
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
  ...mindMapRoutes,
  routes
});

export default router;
