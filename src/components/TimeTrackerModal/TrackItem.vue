<template>
  <div class="track-item row mb-4">
    <div class="col-6 col-sm-5 col-md-4 col-lg-3 track-item-startTime" :title="startTimeFull">
      <span class="year-track">{{YYYY}}</span>.<span class="month-track">{{MM}}</span>.<span class="day-track">{{DD}}</span> -- <span class="hour-track">{{HH}}</span>:<span class="minute-track">{{mm}}</span><span class="second-track hidden">:{{ss}}</span>
    </div>
    <div class="col-6 col-sm-3 col-md-2 col-lg-2">{{duration}}</div>
    <div class="col-12 col-sm-4 col-md-6 col-lg-7 p-2 track-progress-wrapper" :title="titleProgress">
      <div
        class="track-progress-proportion -bg-primary"
        v-bind:style="{ width: proportionComputed + '%', color:'red'}"></div>
      <div
        class="track-progress-percent -bg-secondary"
        v-bind:style="{ width: percentComputed + '%', color:'red'}"></div>
    </div>
  </div>
</template>

<script>
// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// -----styles:
import '@/assets/less/components/todo-tracker.less';

export default {
  name: 'TrackItem',
  props: ['track', 'progress'],
  data () {
    return {
      a: 0
    };
  },
  methods: { },
  computed: {
    ss () {
      return moment(this.track.startTime).format('ss');
    },
    mm () {
      return moment(this.track.startTime).format('mm');
    },
    HH () {
      return moment(this.track.startTime).format('HH');
    },
    YYYY () {
      return moment(this.track.startTime).format('YYYY');
    },
    MM () {
      return moment(this.track.startTime).format('MM');
    },
    DD () {
      return moment(this.track.startTime).format('DD');
    },
    startTimeFull () {
      return moment(this.track.startTime).format('DD.MM.YYYY -- HH:mm:ss');
    },
    duration () {
      return moment.duration(this.track.duration).format('HH:mm:ss', {trim: false});
    },
    proportionComputed () {
      let proportion = 0;
      let arr = this.progress;
      for (var i = 0; i < arr.length; i++) {
        if (this.track.startTime === arr[i].key) {
          proportion = this.progress[i].proportionDuration;
          break;
        }
      }
      return Math.floor(proportion);
    },
    percentComputed () {
      let persent = 0;
      let arr = this.progress;
      for (var i = 0; i < arr.length; i++) {
        if (this.track.startTime === arr[i].key) {
          persent = arr[i].percentDuration;
          break;
        }
      }
      return Math.floor(persent);
    },
    titleProgress () {
      return `${this.proportionComputed} / ${this.percentComputed}`;
    }
  },
  components: { }
};
</script>
