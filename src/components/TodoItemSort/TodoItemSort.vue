<template>
<div class="row trace- mb-3">
  <div
    class="col-3 col-sm-2 col-md-2 col-lg-1 text-left">
    <sort-duration
      v-bind:reset="resets.time"
      @reinit="timeReinit"
      @sort="timeSort">
    </sort-duration>
  </div>
  <div
    class="col-5 col-sm-4 col-md-2 col-lg-2 text-left">
      <sort-select-status
      v-bind:reset="resets.status"
      @reinit="statusReinit"
      @sort="statusSort">
      </sort-select-status>
  </div>
    <div
      class="col-2 col-sm-2 col-md-2 col-lg-1 offset-sm-4 offset-md-6 offset-lg-8 text-right nocursor">
        <transition name="fade">
          <sort-reset
            v-if="isSorted"
            @sort="resetSort">
          </sort-reset>
        </transition>
  </div>
</div>
</template>

<script>
// -----styles:
import '@/assets/less/fade.less';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

// -----vue components:
import SortSelectStatus from '@/components/TodoItemSort/SortSelectStatus';
import SortDuration from '@/components/TodoItemSort/SortDuration';
import SortReset from '@/components/TodoItemSort/SortReset';

// -----other:
import helper from '@/library/todoHelpers';

export default {
  name: 'TodoItemSort',
  data () {
    return {
      resets: {
        time: false,
        status: false
      },
      isSorted: false,
      stats: helper.stats,
      actns: helper.actns
    };
  },
  directives: {
  },
  methods: {
    timeSort (intSortFlag) {
      this.isSorted = true;
      this.$emit('sortbytime', intSortFlag);
    },
    statusSort (status) {
      this.isSorted = true;
      this.$emit('sortbystatus', status);
    },
    resetSort () {
      this.$emit('sortbydefault');
      this.resets.time = true;
      this.resets.status = true;
      this.isSorted = false;
    },
    timeReinit () {
      this.resets.time = false;
    },
    statusReinit () {
      this.resets.status = false;
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
