export const STORAGE_KEY = 'todos-vuejs';
const TODO_KEY = 'todoList';

const INIT_TEMPLATE = JSON.stringify({items: [ ], lastCount: -1});

export const state = {
  [TODO_KEY]: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) !== null ?
  JSON.parse(window.localStorage.getItem(STORAGE_KEY))[TODO_KEY] : JSON.parse(INIT_TEMPLATE)
};
