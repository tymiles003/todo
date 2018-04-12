// -----other:
import array from '@/components/lib/array';

export const notifyMethods = {
  getItemNotify (id) {
    return array.getItemInObjArrByID(id, this.notifyMessages);
  },
  addNotify (newText, duration) {
    let notifyItemsId = this.notifyMessages.length === 0 ? 0 : this.notifyMessages[0].id;
    this.notifyMessages.unshift({
      id: ++notifyItemsId,
      text: newText,
      durationSeconds: duration
    });
  },
  deleteNotify (id) {
    let object = this.getItemNotify(id);
    let index = object.index;
    this.notifyMessages.splice(index, 1);
  }
};
