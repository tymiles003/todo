// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import VueYandexMetrika from 'vue-yandex-metrika';
// -----bootstrap:
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// -----styles:
import './assets/less/common.less';

// import helper from '@/components/lib/todoHelpers';

Vue.config.productionTip = false;

Vue.use(VueYandexMetrika, {
  id: 48713990,
  router: router,
  env: process.env.NODE_ENV,
  options: {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
