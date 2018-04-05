<template>
  <div class="dropdown" title="сортировка по статусу">
    <button class="btn btn-light dropdown-toggle" type="button" id="myDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{label}}
    </button>
    <div class="dropdown-menu" aria-labelledby="myDropdown">
      <a
        v-for="value in values"
        class="dropdown-item"
        @click="selectValue"
        href="#">{{value}}</a>
    </div>
  </div>
</template>

<script>

// -----other:
import helper from '@/components/lib/todoHelpers';



export default {
  name: 'SortSelectStatus',
  data () {
    return {
      values: [
        'All',
        'Pending',
        'Paused',
        'Done'
      ],
      label: 'Статус'
    };
  },
  created () { },
  directives: { },
  methods: {
    selectValue (e) {
      this.label = e.toElement.innerText;
      this.$emit('sort', e.toElement.innerText);
    }
  },
  computed: {
  },
  components: { }
};
</script>
