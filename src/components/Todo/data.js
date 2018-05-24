// -----other:
import helper from '@/library/todoHelpers';
export const data = function () {
  return {
    animStates: {
      newTextVisible: false
    },
    todoList: [ ],
    trackerShow: false,
    showingTodo: {},
    showingTracks: {},
    storeLength: 0,
    stats: helper.stats,
    actns: helper.actns
  };
};
