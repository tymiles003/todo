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
// -----for component:
import {methods} from '@/components/Todo/methods';
import {computed} from '@/components/Todo/computed';
import {mounted} from '@/components/Todo/mounted';
import {updated} from '@/components/Todo/updated';

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
  computed,
  mounted,
  updated,
  methods
};
</script>
