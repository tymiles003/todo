<template>
  <div style="position:relative; height:320px; width: 100%">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
// -----libraries:
import moment from 'moment';
import Chart from 'chart.js';

export default {
  name: 'TrackDiagramm',
  props: ['progress'],
  data () {
    return { };
  },
  mounted () {
    this.test();
  },
  methods: {
    test () {
      let root = this.$vnode.elm;
      let ctx = root.querySelector('#myChart');
      ctx = ctx.getContext('2d');

      let labels = [];
      let dataArrayPercents = [];
      let dataArrayProportion = [];

      this.progress.forEach((val, i, arr) => {
        labels.push(moment(val.key).format('DD.MM.YYYY'));
        dataArrayPercents.push(val.percentDuration);
        dataArrayProportion.push(val.proportionDuration);
      });
      let data = {
        labels: labels,
        datasets: [{
          label: 'percents',
          data: dataArrayPercents,
          backgroundColor: [ 'rgba(220, 53, 69, 0.2)' ],
          borderColor: [ 'rgba(220, 53, 69, 1)' ],
          borderWidth: 1
        }, {
          label: 'proportion',
          data: dataArrayProportion,
          backgroundColor: [ 'rgba(0, 123, 255, 0.2)' ],
          borderColor: [ 'rgba(0, 123, 255, 1)' ],
          borderWidth: 3
        }]
      };

      let options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      };

      let myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      });
      void myChart;
    }
  },
  components: { }
};
</script>
