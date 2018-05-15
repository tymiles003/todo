import Vue from 'vue';
import Vuex from 'vuex';
import {state} from './state';
import {mutations} from './mutations';
import {getters} from './getters';
import {localStoragePlugin} from './plugins';

Vue.use(Vuex);

let UserData = {
  state,
  mutations,
  getters,
  plugins: [localStoragePlugin]
}
let Notify = {
  state: {
    notifyMessages: []
  },
  mutations: { },
  getters: { }
}

export default new Vuex.Store({
  modules: {
    UserData,
    Notify
  }
});
