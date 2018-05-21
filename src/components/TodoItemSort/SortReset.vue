<template>
  <div class="btn btn-light" @click="handlerButton" title="Сбросить фильтры">
    <font-awesome-icon :icon="['fas', 'undo']" />
  </div>
</template>

<script>

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

export default {
  name: 'SortDuration',
  data () {
    return {
      showStatus: 0,
      maxStatus: 2
    };
  },
  created () { },
  directives: { },
  methods: {
    handlerButton () {
      this.showStatus++;
      if (this.showStatus > this.maxStatus) {
        this.showStatus = 0;
      }
      this.$emit('sort', this.showStatus);
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
