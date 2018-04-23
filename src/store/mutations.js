export const mutations = {
  add (state, object) {
    state.todoList.items.push(object);
  },
  addCategory (state, object) {
    state.todoList.categories.push(object);
  },
  delete (state, index) {
    state.todoList.items.splice(index, 1);
  },
  update (state, arg) {
    state.todoList.items[arg.index] = arg.object;
  }
};
