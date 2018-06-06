// -----other:
import array from '@/library/array';

export const UserDataMutations = {
  addCategory (state, object) { // Добавить категорию
    state.todoList.categories.push(object);
  },
  updateCategory (state, arg) { // Обновить(переименовать) категорию
    state.todoList.categories[arg.index] = arg.object;
  },
  setCategory (state, id) { // переключить активную категорию
    state.todoList.selectedCategory = id;
  },
  deleteCategory (state, arg) { // удалить категорию
    // так как после удаленной категории
    // останутся элементы входящие в эту категорию,
    // но имеющие не актуальный categoryId
    // мы перемещаем элементы в категорию по умолчанию
    let orphans = this.getters['UserData/categorySort'](arg.id);
    let indexes = [];

    state.todoList.categories.splice(arg.index, 1);

    orphans.forEach((item, i, arr) => {
      indexes.push(array.getItemInObjArrByID(arr[i].id, state.todoList.items).index);
      arr[i].categoryId = 0;
    });
    indexes.forEach((item, i, arr) => {
      state.todoList.items[item] = orphans[i];
    });
  },
  add (state, object) { // Добавить таск
    state.todoList.items.push(object);
  },
  delete (state, index) { // удалить таск
    state.todoList.items.splice(index, 1);
  },
  update (state, arg) { // обновить таск
    state.todoList.items[arg.index] = arg.object;
  },
  updateAll (state, elements) { // все таски
    elements.forEach((item, i, arr) => {
      state.todoList.items.forEach((item2, i2, arr2) => {
        if (item.id === item2.id) {
          state.todoList.items[i2] = item;
        }
      });
    });
  },
  setLocalization (state, arg) { // сменить текущую локализацию
    state.todoList.localization = arg.loc;
  },
  updateLogin (state, arg) {
    state.todoList.loginData.login = arg.login;
    state.todoList.loginData.token = arg.token;
    state.todoList.loginData.lastLogin = arg.lastLogin;
  }
};
