<template>
  <div class="todo-item-button col-sm-1">
    <div
      class="text-center p-2"
      @click="runThis"
      v-if="isRun">
        <font-awesome-icon icon="play" />
    </div>
    <div
      class="text-center p-2"
      @click="pauseThis"
      v-if="isPause">
        <font-awesome-icon icon="pause" />
    </div>
  </div>
</template>

<script>
// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

export default {
  name: 'PlayButton',
  props: ['isRun', 'isPause'],
  data () {
    return { };
  },
  methods: {
    runThis () {
      this.$emit('run');
    },
    pauseThis () {
      this.$emit('pause');
    }
  },
  computed: { },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
