// -----other:
import array from '@/components/lib/array';

export const mutations = {
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
    let orphans = this.getters.categorySort(arg.id);
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
  setLocalization (state, arg) { // сменить текущую локализацию
    state.todoList.localization = arg.loc;
  }
};
