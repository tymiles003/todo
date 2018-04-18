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
          <ul class="nav nav-tabs mt-2 px-2" role="tablist">
            <li class="nav-item">
              <div
                class="nav-link"
                v-bind:class="{active: isTracker}"
                @click="setTracker"
                data-toggle="tab" role="tab">Трекер</div>
            </li>
            <li class="nav-item">
              <div
                class="nav-link"
                v-bind:class="{active: isDiagramm}"
                @click="setDiagramm"
                data-toggle="tab"
                role="tab">Диаграмма</div>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="fade-element">
              <div
                class="tab-pane fade"
                role="tabpanel"
                v-bind:class="{active: isTracker, show: isTracker}"
                v-if="isTracker">
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
                    v-bind:progress="progressComputed"
                    v-for="track in tracks.slice().reverse()"
                    v-bind:track="track"
                    v-bind:key="track.startTime"
                  ></track-item>
                </div>
              </div>
            </transition>
            <transition name="fade-element">
              <div
                class="tab-pane fade"
                role="tabpanel"
                v-bind:class="{active: isDiagramm, show: isDiagramm}"
                v-if="isDiagramm">
                  <div class="card-body">
                    <track-diagramm
                      v-bind:progress="progressComputed">
                    </track-diagramm>
                  </div>
                </div>
            </transition>
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
import TrackDiagramm from '@/components/TrackDiagramm';

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
      isTracker: true,
      isDiagramm: false
    };
  },
  methods: {
    closeMe () {
      this.$emit('close');
    },
    setTracker () {
      this.isTracker = true;
      this.isDiagramm = false;
    },
    setDiagramm () {
      this.isTracker = false;
      this.isDiagramm = true;
    }
  },
  computed: {
    progressComputed () {
      let sumDuration = this.tracks.reduce((sum, current) => {
        // eslint-disable-next-line
        return sum += current.duration;
      }, 0);
      let durationArray = [];
      this.tracks.forEach((item, i, arr) => {
        durationArray.push(item.duration);
      });
      let maxDuration = Math.max(...durationArray);
      let progressArray = [];

      this.tracks.forEach((item, i, arr) => {
        progressArray.push({
          key: item.startTime,
          proportionDuration: math.getPersentOfValues(item.duration, sumDuration),
          percentDuration: math.getPersentOfMax(item.duration, maxDuration)
        });
      });

      return progressArray;
    }
  },
  components: {
    TrackItem,
    TrackDiagramm,
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
