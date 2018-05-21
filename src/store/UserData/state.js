import math from '@/library/math';
import crypt from '@/library/crypt';
import moment from 'moment';

const KEY_LENGTH = 128;
const KEY_HALF = KEY_LENGTH / 2;
export const STORAGE_KEY = 'time-tracker';
const TODO_KEY = 'todoList';

const DEFAULT_OBJECT = {
  localization: 'en',
  items: [],
  lastCount: -1,
  lastCountCategory: 0,
  selectedCategory: 0,
  categories: [
    {
      id: 0,
      name: 'default',
      color: '#cccccc',
      elements: []
    }
  ]
};

const INIT_TEMPLATE = JSON.stringify(DEFAULT_OBJECT);
let data = '';

export function isFirstRun () {
  return !(window.localStorage.getItem(STORAGE_KEY) !== null);
}

export function keyGen () {
  return crypt.SHA512(String(math.uniqArrayInt(5, 0, 9).join('')) + String(parseInt(moment().format('x'))) + window.navigator.appVersion + String(math.uniqArrayInt(5, 0, 9).join(''))).toString();
}

export function keySet (data, key) {
  return key.substr(0, KEY_HALF) + data + key.substr(KEY_HALF, KEY_LENGTH);
}

export function keyGet (data) {
  return {
    key: data.substr(0, KEY_HALF) + data.substr(data.length - KEY_HALF, data.length),
    data: data.substr(KEY_HALF, data.length - KEY_LENGTH)
  };
}

let key = '';
if (isFirstRun()) {
  data = JSON.parse(INIT_TEMPLATE);
} else {
  let stor = window.localStorage.getItem(STORAGE_KEY);
  key = keyGet(stor).key;
  let exclData = keyGet(stor).data;
  let decrypt = {test: 'test'};
  let isError = false;
  try {
    decrypt = crypt.decrypt(exclData, key);
  } catch (e) {
    isError = true;
  }
  if (isError) {
    data = JSON.parse(INIT_TEMPLATE);
  } else {
    data = JSON.parse(decrypt)[TODO_KEY];
  }
}

export const UserDataState = { [TODO_KEY]: data };

export const KEY = key;
