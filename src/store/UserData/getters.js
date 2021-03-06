function filterAll (item, selectedCategory) {
  if (item.categoryId === selectedCategory) {
    return item;
  }
}

export const UserDataGetters = {
  getCurrentLocal (state) {
    return state.todoList.localization;
  },
  length (state) {
    return state.todoList.items.length;
  },
  all (state) {
    return [...state.todoList.items].filter((todo) => {
      return filterAll(todo, state.todoList.selectedCategory);
    }).sort((a, b) => {
      let at = parseInt(a.sort);
      let bt = parseInt(b.sort);
      return at < bt;
    });
  },
  timeSort (state) {
    return (intSortFlag) => {
      return [...state.todoList.items].filter((todo) => {
        return filterAll(todo, state.todoList.selectedCategory);
      }).sort((a, b) => {
        let at = a.time.pastTime.duration;
        let bt = b.time.pastTime.duration;
        if (intSortFlag === 0) {
          return 0;
        } else if (intSortFlag === 1) {
          return at < bt;
        } else if (intSortFlag === 2) {
          return at > bt;
        } else {
          return 0;
        }
      });
    };
  },
  statusSort (state) {
    const showAll = 'all';
    const showDone = 'done';
    const showUndone = 'undone';
    return (sortByThis) => {
      return state.todoList.items.filter((todo) => {
        if (todo.categoryId === state.todoList.selectedCategory) {
          return todo;
        }
      }).filter((todo) => {
        if (todo.status === sortByThis.toLowerCase()) {
          return todo;
        } else if (showAll === sortByThis.toLowerCase()) {
          return todo;
        } else if (showUndone === sortByThis.toLowerCase() && todo.status !== showDone) {
          return todo;
        }
      });
    };
  },
  categorySort (state) {
    return (categoryId) => {
      return state.todoList.items.filter((todo) => {
        return filterAll(todo, categoryId);
      });
    };
  },
  getCategoryById (state) {
    return (categoryId) => {
      return state.todoList.categories.filter((cat) => {
        if (categoryId === cat.id) {
          return cat;
        }
      });
    };
  },
  getAllCategories (state) {
    return state.todoList.categories;
  },
  getLoginDataAll (state) {
    return state.todoList.loginData;
  },
  getLoginDataToken (state) {
    return state.todoList.loginData.token;
  },
  getFullState (state) {
    return state.todoList;
  }
};
