import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'

import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("en", en);

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const router = new VueRouter({
  routes: Routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
