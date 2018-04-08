import {STORAGE_KEY} from './state';
console.log('>>>>');

export const localStoragePlugin = (store) => {
  store.subscribe((mutation, items) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  });
};
