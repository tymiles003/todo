<template>
  <div class="alert alert-primary" role="alert">
    {{notify.text}}
  </div>
</template>

<script>
// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// eslint-disable-next-line
import momentTimer from 'moment-timer';

export default {
  name: 'notifyItems',
  props: ['notify'],
  data () {
    return { };
  },
  created () {
    let timer = moment.duration(
      moment.duration($store.state.Notify.durationSeconds, 'seconds').asMilliseconds()
    ).timer(() => {
      this.removeNotify();
    });
    timer.start();
  },
  methods: {
    removeNotify () {
      console.log(this.$store.state.Notify);
      // this.deleteNotify(this.$store.state.Notify, this.notify.id);
    }
  },
  computed: { },
  components: { }
};
</script>
