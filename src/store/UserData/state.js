import math from '@/library/math';
import crypt from '@/library/crypt';
import moment from 'moment';

import dataTemplates from './dataTemplates';
import modelChecker from '@/library/modelChecker';

const KEY_LENGTH = 128;
const KEY_HALF = KEY_LENGTH / 2;
export const STORAGE_KEY = 'time-tracker';
const TODO_KEY = 'todoList';

const INIT_TEMPLATE = JSON.stringify(dataTemplates.DEFAULT_OBJECT);
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

let modelValidate = (data) => {
  modelChecker.complement(data, dataTemplates.DEFAULT_OBJECT);
  modelChecker.clippingPropertys(data, ['test']);
  modelChecker.complement(data.loginData, dataTemplates.DEFAULT_OBJECT_LOGIN);
  modelChecker.clippingPropertys(data.loginData, ['login']);
  for (let item of data.items) {
    modelChecker.complement(item, dataTemplates.DEFAULT_OBJECT_ITEM);
    modelChecker.clippingPropertys(item, ['test']);
    modelChecker.complement(item.time, dataTemplates.DEFAULT_OBJECT_ITEM_TIME);
    modelChecker.complement(item.time.pastTime, dataTemplates.DEFAULT_OBJECT_ITEM_TIME_PAST);

    for (let itemTrack of item.time.track) {
      modelChecker.complement(itemTrack, dataTemplates.DEFAULT_OBJECT_ITEM_TIME_TRACK_ITEM);
    }
  }
  for (let cat of data.categories) {
    modelChecker.complement(cat, dataTemplates.DEFAULT_OBJECT_CAT);
    modelChecker.clippingPropertys(cat, ['color', 'elements']);
  }
};

modelValidate(data);
export const UserDataState = { [TODO_KEY]: data };

export const KEY = key;
