// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import  './bus'
import currency from './components/filters/currency'
import timedate from './components/filters/timedate'
import VeeValidate from "vee-validate"
import zhTW_VeeValidate from 'vee-validate/dist/locale/zh_TW'


import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading);
Vue.filter('currency',currency);
Vue.filter('timedate',timedate);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',zhTW_VeeValidate)
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
