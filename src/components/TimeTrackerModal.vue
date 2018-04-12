<template>
  <div class="todo-tracker" @click.stop.self.prevent="closeMe">
    <div class="row justify-content-sm-center" style="width:100%;">
      <div class="col-sm-10">
        <div class="card todo-tracker-modal">
          <h5 class="card-header">
            <div class="row">
              <div class="col-sm-10 pt-2">Трекер активности</div>
              <div class="col-sm-2"><button type="button" class="btn btn-light" style="float: right;" @click="closeMe"><font-awesome-icon icon="times" /></button></div>
            </div>
          </h5>
          <div class="card-body">
            <div class="track-item track-item-legend row">
              <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3 track-item-startTime">
                Время начала работы
              </div>
              <div class="col-xs-12 col-sm-3 col-md-2 col-lg-2">Длительность</div>
              <div class="col-xs-12 col-sm-4 col-md-6 col-lg-7">
                доля процентов выполнения
              </div>
            </div>
          </div>
          <div class="card-body">
            <track-item
              v-bind:percents="percentsComputed"
              v-for="track in tracks"
              v-bind:track="track"
              v-bind:key="track.startTime"
            ></track-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// -----styles:
import '../assets/less/components/todo-tracker.less';
import '../assets/less/fade.less';
// -----vue components:
import TrackItem from '@/components/TrackItem';

// -----other:
import math from '@/components/lib/math';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

export default {
  name: 'TimeTrackerModal',
  props: ['trackerShow', 'tracks'],
  data () {
    return {
      a: 0
    };
  },
  methods: {
    closeMe () {
      this.$emit('close');
    }
  },
  computed: {
    percentsComputed () {
      let sumDuration = this.tracks.reduce((sum, current) => {
        // eslint-disable-next-line
        return sum += current.duration;
      }, 0);
      let percentArray = [];

      this.tracks.forEach((item, i, arr) => {
        percentArray.push({
          key: item.startTime,
          percentDuration: math.getPersentOfValues(item.duration, sumDuration)
        });
      });

      return percentArray;
    }
  },
  components: {
    TrackItem,
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
