import Vue from 'vue';
import Vuex from 'vuex';

import {UserDataState} from './UserData/state';
import {UserDataMutations} from './UserData/mutations';
import {UserDataGetters} from './UserData/getters';
import {localStoragePlugin} from './UserData/plugins';

import {NotifyState} from './Notify/state';
import {NotifyMutations} from './Notify/mutations';
import {NotifyGetters} from './Notify/getters';

import {LoginDataState} from './LoginData/state';
import {LoginDataMutations} from './LoginData/mutations';
import {LoginDataGetters} from './LoginData/getters';

import {LocalizationState} from './Localization/state';
import {LocalizationMutations} from './Localization/mutations';
import {LocalizationGetters} from './Localization/getters';

Vue.use(Vuex);
let UserData = {
  namespaced: true,
  state: UserDataState,
  mutations: UserDataMutations,
  getters: UserDataGetters
};
let LoginData = {
  namespaced: true,
  state: LoginDataState,
  mutations: LoginDataMutations,
  getters: LoginDataGetters
};
let Localization = {
  namespaced: true,
  state: LocalizationState,
  mutations: LocalizationMutations,
  getters: LocalizationGetters
};
let Notify = {
  namespaced: true,
  state: NotifyState,
  mutations: NotifyMutations,
  getters: NotifyGetters
};

export default new Vuex.Store({
  modules: {
    UserData,
    LoginData,
    Notify,
    Localization
  },
  plugins: [ localStoragePlugin({namespace: 'UserData'}) ]
});
