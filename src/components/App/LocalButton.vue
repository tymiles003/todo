<template>
  <div class="btn-group">
    <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span v-if="isRu">Ru</span>
      <span v-if="isEn">En</span>
    </button>
    <div class="dropdown-menu">
      <div
        class="dropdown-item"
        @click="setRu">Русский</div>
      <div
        class="dropdown-item"
        @click="setEn">English</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocalButton',
  data () {
    return {
      localization: undefined
    };
  },
  created () {
    if (!this.$store.state.UserData.todoList.localization) {
      this.$store.state.UserData.todoList.localization = 'en';
    }
    this.localization = this.$store.state.UserData.todoList.localization;
  },
  updated () {
    this.$store.commit('UserData/setLocalization', {loc: this.localization});
  },
  methods: {
    setRu () {
      this.localization = 'ru';
    },
    setEn () {
      this.localization = 'en';
    }
  },
  computed: {
    isRu () {
      return this.localization === 'ru';
    },
    isEn () {
      return this.localization === 'en';
    },
    notRu () {
      return this.localization !== 'ru';
    },
    notEn () {
      return this.localization !== 'en';
    }
  }
};
</script>
