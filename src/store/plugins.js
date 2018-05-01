import {STORAGE_KEY, isFirstRun, keyGen, keySet, KEY} from './state';
import crypt from '@/components/lib/crypt';
export const localStoragePlugin = (store) => {
  if (isFirstRun()) {
    let key = keyGen();
    store.subscribe((mutation, items) => {
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
