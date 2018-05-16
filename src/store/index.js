import Vue from 'vue';
import Vuex from 'vuex';

import {UserDataState} from './UserData/state';
import {UserDataMutations} from './UserData/mutations';
import {UserDataGetters} from './UserData/getters';
import {localStoragePlugin, myPlugin} from './UserData/plugins';

import {NotifyState} from './Notify/state';
import {NotifyMutations} from './Notify/mutations';
import {NotifyGetters} from './Notify/getters';

Vue.use(Vuex);
// let ooo = myPlugin('00');
let UserData = {
  namespaced: true,
  state: UserDataState,
  mutations: UserDataMutations,
  getters: UserDataGetters,
  plugins: [
    localStoragePlugin,
    myPlugin,
    store => store.dispatch('STORE_INIT')
  ]
};
let Notify = {
  namespaced: true,
  state: NotifyState,
  mutations: NotifyMutations,
  getters: NotifyGetters,
};

export default new Vuex.Store({
  modules: {
    UserData,
    Notify
  }
});
