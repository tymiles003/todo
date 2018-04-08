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
      @newText="setNewText"

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
            createdTime: parseInt(moment().format('x')),
            startTime: null,
            pastTime: {
              duration: 0,
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
      let startTime = moment(item.time.startTime);

      let diff = moment.duration(moment().diff(startTime));
      let duration = moment.duration(item.time.pastTime.duration);
      let newDuration = duration.add(diff.asMilliseconds(), 'ms').asMilliseconds();

      item.time.pastTime.duration = newDuration;
      item.time.pastTime.render = duration.format('hh:mm:ss', {trim: false});
      item.time.startTime = null;

      if (item.time.track.length !== 0 && item.time.track[item.time.track.length - 1].duration === 0) {
        item.time.track[item.time.track.length - 1].duration = diff.asMilliseconds();
      }
    },
    statusDone (id) {
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      item.status = this.stats.DONE;
      this.updateDuration(id);
      this.$store.commit('update', {
        index: index,
        object: item
      });
    },
    statusRunning (id) {
      this.pausedAll();
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      item.status = this.stats.RUNNING;
      item.time.startTime = parseInt(moment().format('x'));
      item.time.track.push({
        startTime: parseInt(moment().format('x')),
        duration: 0
      });
      this.$store.commit('update', {
        index: index,
        object: item
      });
    },
    statusPaused (id) {
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      item.status = this.stats.PAUSED;
      this.updateDuration(id);
      this.$store.commit('update', {
        index: index,
        object: item
      });
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
