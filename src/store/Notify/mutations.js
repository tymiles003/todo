// -----other:
import array from '@/library/array';

export const NotifyMutations = {
  addNotify (state, arg) { // Добавить таск
    let notifyItemsId = state.notifyArray.length === 0 ? 0 : state.notifyArray[0].id;
    state.notifyArray.unshift({
      id: ++notifyItemsId,
      text: arg.text,
      durationSeconds: arg.duration
    });
  },
  deleteNotify (state, id) {
    let object = array.getItemInObjArrByID(id, state.notifyArray);
    let index = object.index;
    state.notifyArray.splice(index, 1);
  }
};
