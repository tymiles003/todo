<template>
<div class="row">
  <div class="col-sm-9 col-md-9 col-lg-10 todoItem-text p-3">
    <input
      autofocus type="text"
      class="form-control"
      v-model="newText"
      @keyup.enter="addThis"
      list="hintlist"
      :placeholder="placeholderComputed" />
  </div>
  <div class="col-sm-3 col-md-3 col-lg-2 p-3">
    <button
      class="btn btn-primary btn-block"
      @click="addThis">
        {{getLocalMsg('ITM_LABEL_ADD')}}
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'TodoItemNewLine',
  props: ['todo'],
  data () {
    return {
      newText: '',
      placeholder: ''
    };
  },
  update () {
    this.firstPlaceholder = this.getLocalMsg('ITM_PLACEHOLDER_FIRST_ITEM');
  },
  methods: {
    placeholderControll () {
      if (this.$store.getters.length === 0) {
        this.placeholder = this.getLocalMsg('ITM_PLACEHOLDER_FIRST_ITEM')
      } else {
        this.placeholder = this.getLocalMsg('ITM_PLACEHOLDER_REGULAR_ITEM');
      }
      return this.placeholder;
    },
    addThis () {
      this.$emit('add', this.newText);
      this.newText = '';
    },
    getLocalMsg (key) {
      let lib = this.$store.getters.currentLib;
      let def = this.$store.getters.localLib('en');
      return lib[key]||def[key];
    }
  },
  computed: {
    placeholderComputed () {
      return this.placeholderControll();
    }
  }
};
</script>
