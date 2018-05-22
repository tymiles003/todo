// -----for component:
import {commonMethods} from '@/components/Todo/methods/commonMethods';
import {sortMethods} from '@/components/Todo/methods/sortMethods';
import {statusMethods} from '@/components/Todo/methods/statusMethods';
import {actionsMethods} from '@/components/Todo/methods/actionsMethods';

// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// eslint-disable-next-line
import momentTimer from 'moment-timer';

export const methods = {
  ...commonMethods,
  ...sortMethods,
  ...statusMethods,
  ...actionsMethods,
  addTodo (newText) {
    const trimmedText = newText.trim();
    if (trimmedText && trimmedText !== '') {
      this.$store.commit('UserData/add', {
        id: ++this.$store.state.UserData.todoList.lastCount,
        categoryId: this.$store.state.UserData.todoList.selectedCategory,
        text: trimmedText,
        time: {
          createdTime: parseInt(moment().format('x')),
          startTime: null,
          pastTime: {
            duration: 0,
            render: '00:00:00'
          },
          track: []
        },
        sort: 0,
        status: this.stats.PENDING,
        action: this.actns.DEFAULT
      });
      this.$store.commit('Notify/addNotify', {
        text: this.getLocalMsg('NTF_MSG_TASKADD'),
        duration: 5
      });
      this.sortByCategory();
    }
  },
  clearThis (id) {
    this.$store.commit('UserData/delete', this.getItem(id).index);
    this.todoList = this.$store.getters['UserData/all'];
    this.$store.commit('Notify/addNotify', {
      text: this.getLocalMsg('NTF_MSG_TASKDELETED'),
      duration: 5
    });
    this.sortByCategory();
  },
  setNewText (arg) {
    this.editEndAll();
    let object = this.getItem(arg.id);
    let index = object.index;
    let item = object.object;
    item.text = arg.text;
    this.$store.commit('UserData/update', {
      index: index,
      object: item
    });
    this.$store.commit('Notify/addNotify', {
      text: this.getLocalMsg('NTF_MSG_TASKUPDATE'),
      duration: 5
    });
  }
};
