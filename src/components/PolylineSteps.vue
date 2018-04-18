<template>
  <polyline stroke="rgba(127, 127, 127, 0.25)" stroke-width="1px" :points="pointsComputed" />
</template>

<script>

export default {
  name: 'PolylineSteps',
  props: ['point'],
  methods: { },
  computed: {
    pointsComputed () {
      return `${this.point[0]},0 ${this.point[0]},100`;
    }
  },
  components: { }
};
</script>
