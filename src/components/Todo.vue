<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 p-3">
  <transition name="fade-element">
    <todo-item-new-line
      v-if="animStates.newTextVisible"
      v-bind:todo="todoList"
      @add="addTodo">
    </todo-item-new-line>
  </transition>
 <transition-group name="list" tag="div">
  <todo-item
    v-for="item in todoList.items"
    v-bind:todo="item"
    v-bind:key="item.id"
    @done="statusDone"
    @run="statusRunning"
    @pause="statusPaused"
    @clear="clearThis"
    @edit="itemEdit"

    ></todo-item>
  </transition-group>
  </div>
</div>
</template>

<script>
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
import TodoItem from '@/components/TodoItem';
import TodoItemNewLine from '@/components/TodoItemNewLine';
import helper from '@/components/lib/todoHelpers';
export default {
  name: 'Todo',
  data () {
    return {
      animStates: {
        newTextVisible: false
      },
      todoList: {
        items: [ ],
        lastCount: -1
      },
      stats: helper.stats,
      actns: helper.actns
    };
  },
  components: {
    TodoItem,
    TodoItemNewLine
  },
  mounted: function () {
    this.animStates.newTextVisible = true;
  },
  methods: {
    addTodo (newText) {
      const trimmedText = newText.trim();
      if (trimmedText && trimmedText !== '') {
        this.todoList.items.push({
          id: ++this.todoList.lastCount,
          text: trimmedText,
          time: {
            createdTime: moment(),
            startTime: null,
            pastTime: {
              duration: moment.duration(),
              render: '00:00:00'
            },
            track: [ ]
          },
          status: this.stats.PENDING,
          action: this.actns.DEFAULT
        });
      }
    },
    getItem (id) {
      for (var i = 0; i <= this.todoList.items.length; i++) {
        if (String(this.todoList.items[i].id) === String(id)) {
          return {
            index: i,
            object: this.todoList.items[i]
          };
        }
      }
      return false;
    },
    updateDuration (id) {
      let item = this.getItem(id).object;
      let diff = moment.duration(moment().diff(item.time.startTime));
      item.time.pastTime.duration.add(diff.asMilliseconds(), 'ms');
      item.time.pastTime.render = item.time.pastTime.duration.format('hh:mm:ss', {trim: false});
      item.time.startTime = null;
      if (item.time.track.length !== 0 && item.time.track[item.time.track.length - 1].duration === null) {
        item.time.track[item.time.track.length - 1].duration = diff;
      }
    },
    statusDone (id) {
      let item = this.getItem(id).object;
      item.status = this.stats.DONE;
      this.updateDuration(id);
    },
    statusRunning (id) {
      this.pausedAll();
      let item = this.getItem(id).object;
      item.status = this.stats.RUNNING;
      item.time.startTime = moment();
      item.time.track.push({
        startTime: moment(),
        duration: null
      });
    },
    statusPaused (id) {
      let item = this.getItem(id).object;
      item.status = this.stats.PAUSED;
      this.updateDuration(id);
    },
    clearThis (id) {
      this.todoList.items.splice(this.getItem(id).index, 1);
    },
    itemEdit (id) {
      this.editEndAll();
      let item = this.getItem(id).object;
      item.action = this.actns.EDIT;
    },
    editEndAll () {
      for (var i = 0; i <= this.todoList.items.length - 1; i++) {
        this.todoList.items[i].action = this.actns.DEFAULT;
      }
    },
    pausedAll () {
      for (var i = 0; i <= this.todoList.items.length - 1; i++) {
        if (this.todoList.items[i].status === this.stats.RUNNING) {
          this.statusPaused(this.todoList.items[i].id);
        }
      }
    }
  }
};
</script>
