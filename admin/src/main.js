import Vue from "vue";
import App from "./App";
import router from "./router";
import VueRouter from 'vue-router'
import axios from "axios";
import iView from "iview";
import "iview/dist/styles/iview.css";
import Host from "./lib/env";
import qs from "qs";
import Echart from "echarts";
import "echarts-liquidfill";
import scroll from "vue-seamless-scroll";

import "../lib/jquery.min.js";
import "../lib/jquery.ztree.all.min.js"
import "../lib/zTreeStyle.css"


Vue.use(scroll);
Vue.use(VueRouter);
axios.defaults.baseURL = Host;
Vue.prototype.$http = axios;
Vue.prototype.$echarts = Echart;
Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
});
