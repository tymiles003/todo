import {STORAGE_KEY} from './state';

export const localStoragePlugin = (store) => {
  store.subscribe((mutation, items) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  });
};
