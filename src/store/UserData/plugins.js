import {STORAGE_KEY, isFirstRun, keyGen, keySet, KEY} from './state';
import crypt from '@/components/lib/crypt';

console.log(crypt);
// export function localStoragePlugin (options = {}) {
//   console.log('plugin test');
//   return function (store) {
//     const namespace = options.namespace || '';
//     store.dispatch(namespace + 'pluginAction');
//     console.log('plugin');
//     if (isFirstRun()) {
//       let key = keyGen();
//       store.subscribe((mutation, items) => {
//         let data = crypt.crypt(JSON.stringify(items), key);
//         let dataEnd = keySet(data, key);
//         window.localStorage.setItem(STORAGE_KEY, dataEnd);
//       });
//     } else {
//       store.subscribe((mutation, items) => {
//         let data = crypt.crypt(JSON.stringify(items), KEY);
//         let dataEnd = keySet(data, KEY);
//         window.localStorage.setItem(STORAGE_KEY, dataEnd);
//       });
//     }
//   }
// };
//
export const localStoragePlugin = (store) => {
  console.log('hello');
  if (isFirstRun()) {
    let key = keyGen();
    store.subscribe((mutation, items) => {
      console.log('kkkkkk');
      let data = crypt.crypt(JSON.stringify(items), key);
      let dataEnd = keySet(data, key);
      window.localStorage.setItem(STORAGE_KEY, dataEnd);
    });
  } else {
    store.subscribe((mutation, items) => {
      let data = crypt.crypt(JSON.stringify(items), KEY);
      let dataEnd = keySet(data, KEY);
      window.localStorage.setItem(STORAGE_KEY, dataEnd);
    });
  }
};
