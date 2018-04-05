<template>
<div class="todo-item row row mb-3">
  <div
    class="todo-item-text col-xs-12 col-sm-2 col-md-2 col-lg-1 text-left p-2">
    <sort-duration
      @sort="timeSort">
    </sort-duration>
  </div>
  <div
    class="todo-item-text col-xs-12 col-sm-4 col-md-2 col-lg-2 text-left p-2">
      <sort-select-status
      @sort="statusSort">
      </sort-select-status>
  </div>
  <div
    class="todo-item-text col-xs-12 col-sm-2 col-md-2 col-lg-1 offset-sm-4 offset-md-6 offset-lg-8 text-right p-2">
    <sort-reset
    @sort="resetSort">
  </sort-reset>

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

// -----vue components:
import SortSelectStatus from '@/components/SortSelectStatus';
import SortDuration from '@/components/SortDuration';
import SortReset from '@/components/SortReset';

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
    timeSort (intSortFlag) {
      this.$emit('sortbytime', intSortFlag);
      // console.log(this.$store.getters.doneTodos);
    },
    statusSort (status) {
      this.$emit('sortbystatus', status);
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
    SortSelectStatus,
    SortDuration,
    SortReset,
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
