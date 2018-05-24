<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 p-3">
      <todo-category-panel
        @sort="sortByCategory">
      </todo-category-panel>
      <transition name="fade-element">
        <todo-item-new-line
          v-if="animStates.newTextVisible"
          v-bind:todo="todoItems"
          @add="addTodo">
        </todo-item-new-line>
      </transition>
      <transition name="list-reverse">
        <todo-item-sort
          v-if="storeLength !== 0"
          @sortbydefault="sortByDefault"
          @sortbystatus="sortByStatus"
          @sortbytime="sortByTime">
        </todo-item-sort>
      </transition>

        <transition-group name="list" tag="div">
          <todo-item
            v-for="item in todoItems"
            v-bind:todo="item"
            v-bind:key="item.id"
            v-dragging="{
              item: item,
              list: todoItems,
              group: 'item'
            }"
            @done="statusDone"
            @run="statusRunning"
            @pause="statusPaused"
            @clear="clearThis"
            @edit="itemEdit"
            @newText="setNewText"
            @showtracks="showTracks"
          ></todo-item>
        </transition-group>

    </div>

    <transition name="fade">
      <time-tracker-modal
        v-if="trackerShow"
        v-bind:tracks="showingTracks"
        v-bind:todo="showingTodo"
        @close="hideTracks"
        >
      </time-tracker-modal>
    </transition>

    <datalist id="hintlist">
      <hint-item
        v-for="item in todoItems"
        v-bind:hint="item"
        v-bind:key="item.id">
      </hint-item>
    </datalist>
    <div class="notify-box">
      <transition-group name="list-reverse" tag="div">
        <notify-items
          v-for="item in $store.state.Notify.notifyArray"
          v-bind:notify="item"
          v-bind:key="item.id">
        </notify-items>
      </transition-group>
    </div>
  </div>
</template>

<script>
// -----for component:
import {data} from '@/components/Todo/data';
import {components} from '@/components/Todo/components';
import {methods} from '@/components/Todo/methods';
import {computed} from '@/components/Todo/computed';
import {mounted} from '@/components/Todo/mounted';
import {updated} from '@/components/Todo/updated';

// -----styles:
import '@/assets/less/components/notify-box.less';

export default {
  name: 'Todo',
  data,
  components,
  computed,
  mounted,
  updated,
  methods
};
</script>
