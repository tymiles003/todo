import {STORAGE_KEY} from './state';
console.log('>>>>');
const localStoragePlugin = (store) => {
  console.log('plugin run', store);
  store.subscribe((mutation,  items) => {
    console.log('innnner');
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  });
};

export default localStoragePlugin;
