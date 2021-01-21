/*
 * @Author       : yfye
 * @Date         : 2021-01-21 11:44:59
 * @LastEditors  : yfye
 * @LastEditTime : 2021-01-21 15:00:23
 * @FilePath     : \admin\src\main.js
 */
// import Vue from "vue";
import App from "./App";
import router from "./router";
// import VueRouter from 'vue-router'
// import axios from "axios";
// import iview from "iview";
// import "iview/dist/styles/iview.css";
import Host from "./lib/env";
// import qs from "qs";
import echarts from "echarts";
import "echarts-liquidfill";
import scroll from "vue-seamless-scroll";
Vue.use(scroll);
Vue.use(VueRouter);
axios.defaults.baseURL = Host;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(iview);
Vue.use(moment);
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
