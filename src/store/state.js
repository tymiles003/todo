export const STORAGE_KEY = 'todos-vuejs';
const TODO_KEY = 'todoList';
const DEFAULT_OBJECT = {
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
}
const INIT_TEMPLATE = JSON.stringify(DEFAULT_OBJECT);

export const state = {
  [TODO_KEY]: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) !== null ? JSON.parse(window.localStorage.getItem(STORAGE_KEY))[TODO_KEY] : JSON.parse(INIT_TEMPLATE)
};
