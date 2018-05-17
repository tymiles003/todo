import {STORAGE_KEY, isFirstRun, keyGen, keySet, KEY} from './state';
import crypt from '@/components/lib/crypt';

export const localStoragePlugin = (options) => {
  const namespace = options.namespace;
  return (store) => {
    if (isFirstRun()) {
      let key = keyGen();
      store.subscribe((mutation, items) => {
        if (namespace && items[namespace]) {
          let data = crypt.crypt(JSON.stringify(items[namespace]), key);
          let dataEnd = keySet(data, key);
          window.localStorage.setItem(STORAGE_KEY, dataEnd);
        }
      });
    } else {
      store.subscribe((mutation, items) => {
        if (namespace && items[namespace]) {
          let data = crypt.crypt(JSON.stringify(items[namespace]), KEY);
          let dataEnd = keySet(data, KEY);
          window.localStorage.setItem(STORAGE_KEY, dataEnd);
        }
      });
    }
  };
};
