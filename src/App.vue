<template>
<div id="app">
  <panel-app
    @show="showPopupLogin">
  </panel-app>
  <header-app/>
  <router-view/>
  <login-modal
    v-if="isLoginPopupShow"
    @close="closePopupLogin">
  </login-modal>
</div>
</template>

<script>
import PanelApp from '@/components/App/PanelApp';
import HeaderApp from '@/components/App/HeaderApp';
import LoginModal from '@/components/LoginModal/LoginModal';

export default {
  name: 'App',
  data () {
    return {
      isLoginPopupShow: false
    };
  },
  methods: {
    showPopupLogin () {
      this.isLoginPopupShow = true;
    },
    closePopupLogin () {
      this.isLoginPopupShow = false;
    }
  },
  computed: { },
  components: {
    HeaderApp,
    PanelApp,
    LoginModal
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
