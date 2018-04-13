<template>
<div class="todo-item row" v-bind:class="todo.status">
  <play-button
    :isRun="isRun"
    :isPause="isPause"
    @run="runThis"
    @pause="pauseThis">
  </play-button>
  <div
    class="todo-item-time col-sm-3 col-md-2 col-lg-2 text-left pr-2 pl-2 pt-3"
    @click="showTracks">
      {{todo.time.pastTime.render}}
      <transition name="fade">
        <time-tracker-modal
          v-if="trackerShow"
          v-bind:trackerShow="trackerShow"
          v-bind:tracks="todo.time.track"
          @close="hideTracks">
        </time-tracker-modal>
      </transition>
  </div>
  <div
    class="todo-item-text col-sm-3 col-md-6 col-lg-7 text-left pr-2 pl-2 pt-3"
    @click="editThis"
    v-if="todo.action!==actns.EDIT"
    :title="todo.status">
      {{todo.text}}
  </div>
  <transition name="fade-element">
    <todo-item-edit
      @editText="setNewText"
      v-bind:todo="todo">
    </todo-item-edit>
  </transition>
  <div
    class="todo-item-button col-sm-1 col-md-2 col-lg-1 text-center p-2"
    @click="doneThis"
    v-if="isDone">
      <font-awesome-icon :icon="['far', 'square']" />
  </div>
  <div
    class="todo-item-button col-sm-1 col-md-2 col-lg-1 text-center p-2"
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
// -----styles:
import '../assets/less/components/todo-item.less';
import '../assets/less/fade.less';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

// -----vue components:
import TodoItemEdit from '@/components/TodoItemEdit';
import TimeTrackerModal from '@/components/TimeTrackerModal';
import PlayButton from '@/components/PlayButton';

// -----other:
import helper from '@/components/lib/todoHelpers';

export default {
  name: 'TodoItem',
  props: ['todo'],
  data () {
    return {
      animStates: {
        newTextVisible: false
      },
      trackerShow: false,
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
      this.$emit('done', this.todo.id);
    },
    runThis () {
      this.$emit('run', this.todo.id);
    },
    pauseThis () {
      this.$emit('pause', this.todo.id);
    },
    clearThis () {
      this.$emit('clear', this.todo.id);
    },
    editThis () {
      this.$emit('edit', this.todo.id);
    },
    setNewText (fromChild) {
      // this.todo.text = fromChild.text;
      this.$emit('newText', {
        id: this.todo.id,
        text: fromChild.text
      });
    },
    showTracks () {
      this.trackerShow = true;
    },
    hideTracks () {
      this.trackerShow = false;
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
    TodoItemEdit,
    TimeTrackerModal,
    PlayButton
  }
};
</script>
