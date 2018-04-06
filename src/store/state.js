export const STORAGE_KEY = 'todos-vuejs';

const INIT_TEMPLATE = JSON.stringify({items:[ ], lastCount: -1});

export const state = {
  todoList: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || INIT_TEMPLATE)
};
