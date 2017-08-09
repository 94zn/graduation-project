// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'underscore'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-default/index.css'
window._ = _;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
