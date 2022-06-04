import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

//vuelidate plugin
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//vue2-select plugin
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/src/scss/vue-select.scss'

new Vue({
  router,
  store,
  validations: {},
  render: (h) => h(App)
}).$mount("#app");