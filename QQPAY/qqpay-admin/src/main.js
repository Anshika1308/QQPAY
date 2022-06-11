import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { i18n } from './locale/index';
import Vuelidate from 'vuelidate';


Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

//vuelidate plugin

//vue2-select plugin
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/src/scss/vue-select.scss'

new Vue({
  router,
  store,
  validations: {},
  i18n,
  render: (h) => h(App)
}).$mount("#app");