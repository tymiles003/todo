// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

// -----bootstrap:
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// -----styles:
import './assets/less/common.less';

// import helper from '@/components/lib/todoHelpers';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
