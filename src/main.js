// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
// eslint-disable-next-line
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/less/common.less';
Vue.use(Vuex);
Vue.config.productionTip = true;
/* eslint-disable no-new */

const store = new Vuex.Store({
  state: {
    todoList: {
      items: [ ],
      lastCount: -1
    }
  },
  mutations: {
    add (state, object) {
      state.todoList.items.push(object);
    },
    delete (state, index) {
      state.todoList.items.splice(index, 1);
    }
  }
});

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
