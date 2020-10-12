import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
import './utils/directives.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss' // global css

Vue.use(Element)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");