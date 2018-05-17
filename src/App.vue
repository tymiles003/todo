<template>
<div id="app">
  <div class="row mb-4">
    <div class="col-sm-6 text-left">
      <h1 class="title h4">Time Tracker</h1>
      <span>just count your time</span>
    </div>
    <div class="col-sm-6 text-right">
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
    </div>
    <div class="col-sm-6"></div>
  </div>
  <hr/>
  <router-view/>
</div>
</template>

<script>

export default {
  name: 'App',
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.dropdown-item{
  cursor: pointer;
}
</style>
