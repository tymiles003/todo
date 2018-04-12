// -----other:
import helper from '@/components/lib/todoHelpers';
export const data = function () {
  return {
    animStates: {
      newTextVisible: false
    },
    notifyMessages: [],
    todoList: [ ],
    storeLength: 0,
    stats: helper.stats,
    actns: helper.actns
  };
};
