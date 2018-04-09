// -----for component:
import {commonMethods} from '@/components/Todo/methods/commonMethods';
import {sortMethods} from '@/components/Todo/methods/sortMethods';
import {statusMethods} from '@/components/Todo/methods/statusMethods';
import {actionsMethods} from '@/components/Todo/methods/actionsMethods';

// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';

export const methods = {
  ...commonMethods,
  ...sortMethods,
  ...statusMethods,
  ...actionsMethods,
  addTodo (newText) {
    const trimmedText = newText.trim();
    if (trimmedText && trimmedText !== '') {
      this.$store.commit('add', {
        id: ++this.$store.state.todoList.lastCount,
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
    }
  },
  clearThis (id) {
    this.$store.commit('delete', this.getItem(id).index);
    this.todoList = this.$store.getters.all;
  },
  setNewText (arg) {
    this.editEndAll();
    let object = this.getItem(arg.id);
    let index = object.index;
    let item = object.object;
    item.text = arg.text;
    this.$store.commit('update', {
      index: index,
      object: item
    });
  }
};
