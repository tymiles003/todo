<template>
  <div style="position:relative; min-height:400px; left:0px;">
    <svg
      style="position:absolute; left:0px;"
      width="100%"
      height="400px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 100">
      <text x="0" y="0" font-size="12" fill="rgba(127, 127, 127, 0.5)">Max</text>
      <text x="0" y="100" font-size="12" fill="rgba(127, 127, 127, 0.5)">Min</text>
      <text x="0" y="120" font-size="12" fill="rgba(127, 127, 127, 0.5)">
        Начальная
        <tspan dx="-64px" dy="12px">активность</tspan>
      </text>
      <text x="578" y="120" font-size="12" fill="rgba(127, 127, 127, 0.5)">
        Последняя
        <tspan dx="-64px" dy="12px">активность</tspan>
      </text>
      <polyline stroke="#ccc" stroke-width="1px" points="0,100 640,100" />
      <polyline stroke="rgba(255,127,127,0.5)" stroke-width="1px" points="0,50 640,50" />
      <polyline stroke="#ccc" stroke-width="1px" points="0,0 640,0" />
      <polyline-steps
        v-for="point in pointsPerc"
        v-bind:point="point"
        v-bind:key="point.key">
      </polyline-steps>
      <polyline
        stroke="rgba(255,0,0,0.50)"
        stroke-width="1px"
        fill="rgba(255,0,0,0.25)"
        :points="points"
      />
      <polyline
        stroke="rgba(0,0,255,0.50)"
        stroke-width="1px"
        fill="rgba(0,0,255,0.25)"
        :points="points2"
      />
    </svg>
  </div>
</template>

<script>
// -----other:
import math from '@/components/lib/math';
import array from '@/components/lib/array';

// -----vue components:
import PolylineSteps from '@/components/PolylineSteps';

export default {
  name: 'TrackDiagramm',
  props: ['progress'],
  data () {
    return {
      stepsPerc: 10,
      stepsProp: 10,
      stepCoordPerc: 0,
      stepCoordProp: 0,
      xMax: 640,
      yMax: 100,
      pointsPerc: [],
      pointsProp: []
    };
  },
  methods: {
    correctMiddleArray (arr) {
      // magic!
      if (array.equalArray(arr, (num) => { return num < 1; })) {
        arr = array.updateArray(arr, (item) => {
          return item * 50000;
        });
        return this.correctMiddleArray(arr);
      } else {
        return arr;
      }
    },
    getPointsMain (key, pointsArray, steps, stepsCoord) {
      let pointsReturn = '';
      let percentArray = [];
      let percentArrayMiddle = [];
      if (this.progress && this.progress.length === 0) {
        return '0,0 0,0';
      }
      this.progress.forEach((item, i, arr) => {
        percentArray.push(item[key]);
      });
      percentArrayMiddle = math.getMiddleArray(percentArray, steps);
      percentArrayMiddle = this.correctMiddleArray(percentArrayMiddle);

      steps = percentArrayMiddle.length < steps ? percentArrayMiddle.length - 1 : steps - 1;
      stepsCoord = this.xMax / steps;
      percentArrayMiddle.forEach((item, i, arr) => {
        if (i === 0) {
          pointsArray.push([0, this.yMax]);
          pointsArray.push([0, -(parseInt(item)) + this.yMax]);
        } else {
          pointsArray.push([pointsArray[pointsArray.length - 1][0] + stepsCoord, -(parseInt(item)) + this.yMax]);
        }
      });
      pointsArray.push([pointsArray[pointsArray.length - 1][0], 100]);

      pointsArray.forEach((item, i, arr) => {
        // eslint-disable-next-line
        pointsReturn += item.join(',') + ' ';
      });
      return pointsReturn;
    }
  },
  computed: {
    points () {
      return this.getPointsMain('percentDuration', this.pointsPerc, this.stepsPerc, this.stepCoordPerc);
    },
    points2 () {
      return this.getPointsMain('proportionDuration', this.pointsProp, this.stepsProp, this.stepCoordProp);
    }
  },
  components: {
    PolylineSteps
  }
};
</script>
