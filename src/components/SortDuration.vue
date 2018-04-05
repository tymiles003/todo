<template>
  <div class="btn btn-light" @click="handlerButton" :title="titleComputed">
    <font-awesome-icon :icon="['far', 'clock']" />
    <span style="opacity:0;"><font-awesome-icon v-if="showStatus===0" :icon="['fas', 'caret-up']" /></span>
    <font-awesome-icon v-if="showStatus===1" :icon="['fas', 'caret-up']" />
    <font-awesome-icon v-if="showStatus===2" :icon="['fas', 'caret-down']" />
  </div>
</template>

<script>

// -----other:
import helper from '@/components/lib/todoHelpers';

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
      if(this.showStatus > this.maxStatus){
        this.showStatus = 0;
      }
      this.$emit('sort', this.showStatus);
    }
  },
  computed: {
    titleComputed (){
      const sw0 = 'Отсортировать по продолжительности';
      const sw1 = 'Отсортировано по продолжительности в порядке возрастания';
      const sw2 = 'Отсортировано по продолжительности в порядке убывания';
      return this.showStatus === 0?sw0:this.showStatus === 1?sw1:this.showStatus === 2?sw2:sw0;
    }
  },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
