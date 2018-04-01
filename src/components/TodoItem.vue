<template>
<div class="todo-item row" v-bind:class="todo.status">
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="runThis"
    v-if="isRun">
      <font-awesome-icon icon="play" />
  </div>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="pauseThis"
    v-if="isPause">
      <font-awesome-icon icon="pause" />
  </div>
  <div
    class="todo-item-time col-sm-3 col-md-2 col-lg-1 text-left p-2">
      {{todo.time.pastTime.render}}
  </div>
  <div
    class="todo-item-text col-sm-6 col-md-7 col-lg-8 text-left p-2"
    @click="editThis"
    v-if="todo.action!==actns.EDIT"
    :title="todo.status">
      {{todo.text}}
  </div>
  <todo-item-edit
    @editText="setNewText"
    v-bind:todo="todo">
  </todo-item-edit>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="doneThis"
    v-if="isDone">
      <font-awesome-icon :icon="['far', 'square']" />
  </div>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="pauseThis"
    v-if="todo.status===stats.DONE">
      <font-awesome-icon
        :icon="['far', 'check-square']" />
  </div>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="clearThis">
      <font-awesome-icon icon="times" />
  </div>
  <div class="row hidden">
    <pre style="text-align:left;">
      {{todo.time}}
    </pre>
  </div>
</div>
</template>

<script>
// eslint-disable-next-line
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line
import faSolid from '@fortawesome/fontawesome-free-solid';
// eslint-disable-next-line
import faRegular from '@fortawesome/fontawesome-free-regular';
// eslint-disable-next-line
import brands from '@fortawesome/fontawesome-free-brands'
import TodoItemEdit from '@/components/TodoItemEdit';
import helper from '@/components/lib/todoHelpers';
export default {
  name: 'TodoItem',
  props: ['todo'],
  data () {
    return {
      stats: helper.stats,
      actns: helper.actns
    };
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus();
      }
    }
  },
  methods: {
    doneThis () {
      this.$parent.statusDone(this.todo.id);
    },
    runThis () {
      this.$parent.pausedAll();
      this.$parent.statusRunning(this.todo.id);
    },
    pauseThis () {
      this.$parent.statusPaused(this.todo.id);
    },
    clearThis () {
      this.$parent.clearThis(this.todo.id);
    },
    editThis () {
      this.$parent.editEndAll();
      this.$parent.itemEdit(this.todo.id);
    },
    setNewText (fromChild) {
      this.todo.text = fromChild.text;
    }
  },
  computed: {
    isRun: function () {
      return (
        this.todo.status === this.stats.PENDING ||
        this.todo.status === this.stats.PAUSED ||
        this.todo.status === this.stats.DONE
      ) && this.todo.status !== this.stats.RUNNING;
    },
    isPause: function () {
      return this.todo.status !== this.stats.PENDING &&
      this.todo.status !== this.stats.PAUSED &&
      this.todo.status !== this.stats.DONE;
    },
    isDone: function () {
      return this.todo.status !== this.stats.DONE &&
      (
        this.todo.status === this.stats.RUNNING ||
        this.todo.status === this.stats.PAUSED ||
        this.todo.status === this.stats.PENDING
      );
    }
  },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands,
    TodoItemEdit
  }
};
</script>
