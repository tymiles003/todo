<template>
<div id="app">
  <panel-app/>
  <header-app/>
  <router-view/>
</div>
</template>

<script>
import PanelApp from '@/components/App/PanelApp';
import HeaderApp from '@/components/App/HeaderApp';

export default {
  name: 'App',
  data () {
    return { };
  },
  methods: { },
  computed: { },
  components: {
    HeaderApp,
    PanelApp
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
