<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 p-3">
    <transition name="list-reverse">
      <todo-item-sort
        v-if="storeLength !== 0"
        @sortbydefault="sortByDefault"
        @sortbystatus="sortByStatus"
        @sortbytime="sortByTime">
      </todo-item-sort>
    </transition>
    <transition name="fade-element">
      <todo-item-new-line
        v-if="animStates.newTextVisible"
        v-bind:todo="todoItems"
        @add="addTodo">
      </todo-item-new-line>
    </transition>

   <transition-group name="list" tag="div">
    <todo-item
      v-for="item in todoItems"
      v-bind:todo="item"
      v-bind:key="item.id"
      @done="statusDone"
      @run="statusRunning"
      @pause="statusPaused"
      @clear="clearThis"
      @edit="itemEdit"

      ></todo-item>
    </transition-group>
    <pre class="text-left hidden" style="font-size:1.2em;">{{todoItems}}</pre>
  </div>
</div>
</template>

<script>
// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';

// -----components:
import TodoItem from '@/components/TodoItem';
import TodoItemSort from '@/components/TodoItemSort';
import TodoItemNewLine from '@/components/TodoItemNewLine';

// -----other:
import helper from '@/components/lib/todoHelpers';
export default {
  name: 'Todo',
  data () {
    return {
      animStates: {
        newTextVisible: false
      },
      todoList: [ ],
      storeLength: 0,
      stats: helper.stats,
      actns: helper.actns
    };
  },
  components: {
    TodoItem,
    TodoItemSort,
    TodoItemNewLine
  },
  computed: {
    todoItems () {
      return this.todoList;
    }
  },
  mounted: function () {
    this.animStates.newTextVisible = true;
    this.todoList = this.$store.getters.all;
    this.storeLength = this.$store.getters.length;
  },
  updated: function () {
    this.storeLength = this.$store.getters.length;
  },
  methods: {
    sortByDefault () {
      this.todoList = this.$store.getters.all;
    },
    sortByStatus (status) {
      this.todoList = this.$store.getters.statusSort(status);
    },
    sortByTime (intSortFlag) {
      this.todoList = this.$store.getters.timeSort(intSortFlag);
    },
    addTodo (newText) {
      const trimmedText = newText.trim();
      if (trimmedText && trimmedText !== '') {
        this.$store.commit('add', {
          id: ++this.$store.state.todoList.lastCount,
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
          sort: 0,
          status: this.stats.PENDING,
          action: this.actns.DEFAULT
        });
      }
    },
    getItem (id) {
      for (var i = 0; i <= this.$store.state.todoList.items.length; i++) {
        if (String(this.$store.state.todoList.items[i].id) === String(id)) {
          return {
            index: i,
            object: this.$store.state.todoList.items[i]
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
      this.$store.commit('delete', this.getItem(id).index);
      this.todoList = this.$store.getters.all;
    },
    itemEdit (id) {
      this.editEndAll();
      let item = this.getItem(id).object;
      item.action = this.actns.EDIT;
    },
    editEndAll () {
      for (var i = 0; i <= this.$store.state.todoList.items.length - 1; i++) {
        this.$store.state.todoList.items[i].action = this.actns.DEFAULT;
      }
    },
    pausedAll () {
      for (var i = 0; i <= this.$store.state.todoList.items.length - 1; i++) {
        if (this.$store.state.todoList.items[i].status === this.stats.RUNNING) {
          this.statusPaused(this.$store.state.todoList.items[i].id);
        }
      }
    }
  }
};
</script>
