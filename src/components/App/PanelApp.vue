<template>
  <div class="row">
    <div class="col-sm-12 text-right">
      <login-button
        v-if="!isLogin"
        @show="showPopupLogin">
      </login-button>
      <exit-button
        v-if="isLogin">
      </exit-button>
      <local-button/>
    </div>
  </div>
</template>

<script>
import LocalButton from '@/components/App/LocalButton';
import LoginButton from '@/components/App/LoginButton';
import ExitButton from '@/components/App/ExitButton';
export default {
  name: 'PanelApp',
  data () {
    return { };
  },
  methods: {
    showPopupLogin () {
      this.$emit('show');
    }
  },
  computed: {
    isLogin () {
      let userName = this.$store.getters['LoginData/getLogin'];
      let boolExpr = userName !== "anonymous";
      return boolExpr;
    }
  },
  components: {
    LocalButton,
    LoginButton,
    ExitButton
  }
};
</script>
