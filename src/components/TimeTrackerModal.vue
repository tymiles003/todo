<template>
  <div class="todo-tracker" @click.stop.self.prevent="closeMe">
    <div class="todo-tracker-modal">
      <pre class="text-left">{{track}}</pre>
    </div>
  </div>
</template>

<script>
// -----styles:
import '../assets/less/components/todo-tracker.less';
import '../assets/less/fade.less';

export default {
  name: 'TimeTrackerModal',
  props: ['trackerShow', 'track'],
  data () {
    return {
      a: 0
    };
  },
  methods: {
    closeMe () {
      console.log('click');
      this.$emit('close');
    }
  }
};
</script>
