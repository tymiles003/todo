// -----other:
import array from '@/components/lib/array';

const notify = {
  install (Vue){
    Vue.prototype.notify = {
      getItemNotify (notifyArray, id) {
        return array.getItemInObjArrByID(id, notifyArray);
      },
      addNotify (notifyArray, newText, duration) {
        let notifyItemsId = notifyArray.length === 0 ? 0 : notifyArray[0].id;
        notifyArray.unshift({
          id: ++notifyItemsId,
          text: newText,
          durationSeconds: duration
        });
      },
      deleteNotify (notifyArray, id) {
        let object = this.getItemNotify(id);
        let index = object.index;
        notifyArray.splice(index, 1);
      }
    }
  }
};

export default notify;
