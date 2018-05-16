// -----other:
import array from '@/components/lib/array';
// the plugin example
const notify = {
  install (Vue){
    Vue.prototype.notify = {
      getItemNotify (notifyArray, id) {
        // return array.getItemInObjArrByID(id, notifyArray);
        return 0;
      },
      addNotify (notifyArray, newText, duration) {
        // let notifyItemsId = notifyArray.length === 0 ? 0 : notifyArray[0].id;
        // notifyArray.unshift({
        //   id: ++notifyItemsId,
        //   text: newText,
        //   durationSeconds: duration
        // });
        return 0;
      },
      deleteNotify (notifyArray, id) {
        // let object = this.getItemNotify(id);
        // let index = object.index;
        // notifyArray.splice(index, 1);
        return 0;
      }
    }
  }
};

export default notify;
