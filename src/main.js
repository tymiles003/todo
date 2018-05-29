// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import getLocalMsg from '@/plugins/getLocalMsg';
// import notify from '@/components/plugins/notify';

import VueYandexMetrika from 'vue-yandex-metrika';

// -----bootstrap:
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// -----bootstrap-vue:
import BootstrapVue from 'bootstrap-vue';
import VueDND from 'awe-dnd';

// -----styles:
import '@/assets/less/common.less';

// import helper from '@/components/lib/todoHelpers';
Vue.config.productionTip = false;

Vue.use(VueDND);
Vue.use(BootstrapVue);

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

Vue.use(getLocalMsg);
// Vue.use(notify);

// let sendData = {
//   'username': 'Johnny',
//   'email': 'john@kage.ghh',
//   'password': '123'
// };
// ajax
//   .request({
//     // address: 'http://rest/test',
//     address: 'http://rest2/register',
//     method: 'POST'
//   })
//   .complete((e) => { console.log(e); })
//   .error((e) => { console.log(e); })
//   .send(sendData);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
