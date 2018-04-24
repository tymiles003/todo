export const getters = {
  length (state) {
    return state.todoList.items.length;
  },
  all (state) {
    return state.todoList.items;
  },
  timeSort (state) {
    return (intSortFlag) => {
      return [...state.todoList.items].sort((a, b) => {
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
        if (todo.categoryId === categoryId) {
          return todo;
        }
      });
    };
  }
};
