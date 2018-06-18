<template>
<div id="app">
  <ul class="text-left">
    <li>{{$store.getters['UserData/getLoginDataAll']}}</li>
    <li>{{$store.getters['UserData/getLoginDataToken']}}</li>
    <li>{{$store.getters['LoginData/getAll']}}</li>
  </ul>
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

// -----libs:
import ajax from '@/library/ajax';

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
  beforeCreate () {
    this.checkLogin.checkLoginData(this.$store)
    console.log(this.$store);
    console.log(this.$store.getters['UserData/getLoginDataAll']);
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
