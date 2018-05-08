<template>
<div id="app">
  <div class="row mb-4">
    <div class="col-sm-6 text-left">
      <h1 class="title h4">Time Tracker</h1>
      <span>just count your time</span>
    </div>
    <div class="col-sm-6"></div>
  </div>
  <hr/>
  <router-view/>
</div>
</template>

<script>
export default {
  name: 'App'
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
</style>
