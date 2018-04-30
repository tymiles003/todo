<template>
  <div class="col-7 col-sm-4 col-md-5 col-lg-7 input-group pr-2 pl-2 pt-2"  v-if="todo.action===actns.EDIT">
    <input type="text" class="form-control" v-model="newText" @keydown.enter="editEnd" v-focus/>
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="editEnd">
        Ok
      </button>
    </div>
  </div>
</template>

<script>
import helper from '@/components/lib/todoHelpers';
export default {
  name: 'TodoItemEdit',
  props: ['todo'],
  data () {
    return {
      newText: this.todo.text,
      elem: null,
      stats: helper.stats,
      actns: helper.actns
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
        el.select();
      }
    }
  },
  methods: {
    editEnd () {
      window.getSelection().removeAllRanges();
      this.$emit('editText', {text: this.newText});
      this.todo.action = this.actns.DEFAULT;
    }
  }
};
</script>
