// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';

// -----styles:
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/less/common.less';

import helper from '@/components/lib/todoHelpers';

Vue.use(Vuex);

Vue.config.productionTip = true;
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
  },
  getters: {
    all (state) {
      return state.todoList.items;
    },
    timeSort (state) {
      return [...state.todoList.items].sort((a, b) => {
        let at = a.time.pastTime.duration;
        let bt = b.time.pastTime.duration;
        return at.as('ms') < bt.as('ms');
      });
    },
    doneTodos (state) {
      return state.todoList.items.filter((todo) => {
        if (todo.status === helper.stats.DONE) {
          return todo;
        }
      });
    }
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
