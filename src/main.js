// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';

// -----bootstrap:
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// -----styles:
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
      return (intSortFlag)=>{
        return [...state.todoList.items].sort((a, b) => {
          let at = a.time.pastTime.duration;
          let bt = b.time.pastTime.duration;
          if(intSortFlag === 0){
            return 0;
          }else if(intSortFlag === 1){
            return at.as('ms') < bt.as('ms');
          }else if(intSortFlag === 2){
            return at.as('ms') > bt.as('ms');
          }else{
            return 0;
          }
        });
      }
    },
    statusSort (state) {
      const showAll = 'all'
      return (sortByThis)=>{
        return state.todoList.items.filter((todo) => {
          if (todo.status === sortByThis.toLowerCase()) {
            return todo;
          }else if(showAll === sortByThis.toLowerCase()){
            return todo;
          }
        });
      }
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
