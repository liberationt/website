import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/layout'
import { getToken, setToken, removeToken } from '@/utils/auth'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/login",
  //   name: "login",
  //   component: ()=>	import ('@/views/login')
  // },
];
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
