export const mutations = {
  add (state, object) {
    state.todoList.items.push(object);
  },
  delete (state, index) {
    state.todoList.items.splice(index, 1);
  }
};
