<template>
<div class="todo-item row">
  <div
    class="todo-item-button col-sm-1 text-center p-2">
      активность
  </div>
  <div
    class="todo-item-button col-sm-3 col-md-2 col-lg-1 text-center p-2"
    @click="timeSort">
      время
  </div>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="statusSort">
      статус
  </div>
  <div
    class="todo-item-button col-sm-1 text-center p-2"
    @click="resetSort">
      x
  </div>
</div>
</template>

<script>
// -----styles:
import '../assets/less/fade.less';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

// -----other:
import helper from '@/components/lib/todoHelpers';

export default {
  name: 'TodoItemSort',
  data () {
    return {
      stats: helper.stats,
      actns: helper.actns
    };
  },
  directives: {
  },
  methods: {
    timeSort () {
      this.$emit('sortbytime');
      // console.log(this.$store.getters.doneTodos);
    },
    statusSort () {
      this.$emit('sortbystatus');
      // console.log(this.$store.getters.doneTodos);
    },
    resetSort () {
      this.$emit('sortbydefault');
      // console.log(this.$store.getters.doneTodos);
    }
  },
  computed: {
  },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
