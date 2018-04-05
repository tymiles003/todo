<template>
<div class="row">
  <div class="col-sm-10 todoItem-text p-3">
    <input autofocus type="text" class="form-control" v-model="newText"
    @keyup.enter="addThis"
    :placeholder="placeholderComputed" />
  </div>
  <div class="col-sm-2 p-3">
    <button class="btn btn-primary btn-block" @click="addThis">add</button>
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
      placeholder: '',
      firstPlaceholder: 'Создайте вашу первую задачу',
      regularPlaceholder: 'Добавьте запись'
    };
  },
  methods: {
    placeholderControll () {
      if (this.$store.getters.length === 0) {
        this.placeholder = this.firstPlaceholder;
      } else {
        this.placeholder = this.regularPlaceholder;
      }
      return this.placeholder;
    },
    addThis () {
      this.$emit('add', this.newText);
      this.newText = '';
    }
  },
  computed: {
    placeholderComputed () {
      return this.placeholderControll();
    }
  }
};
</script>
