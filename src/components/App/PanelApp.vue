<template>
  <div class="row">
    <div class="col-sm-12 text-right">
      <login-button
        v-if="!isLogin"
        @show="showPopupLogin"></login-button>
      <local-button/>
    </div>
  </div>
</template>

<script>
import LocalButton from '@/components/App/LocalButton';
import LoginButton from '@/components/App/LoginButton';
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
      return true;
    }
  },
  components: {
    LocalButton,
    LoginButton
  }
};
</script>
