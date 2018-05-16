import {STORAGE_KEY, isFirstRun, keyGen, keySet, KEY} from './state';
import crypt from '@/components/lib/crypt';

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
//   };
// };

export const localStoragePlugin = (store) => {
  if (isFirstRun()) {
    console.log('hello', store);
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

export const myPlugin = (arg) => {
  // called when the store is initialized
  console.log('1', arg);
  return store => {
    console.log('2', arg);
    store.subscribe((mutation, state) => {
      console.log('3', arg);
      console.log(state, 'eee');
      // called after every mutation.
      // The mutation comes in the format of `{ type, payload }`.
    })();
  };
};
