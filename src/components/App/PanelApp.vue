<template>
  <div class="row">
    <div class="col-sm-12 text-right">
      <login-button/>
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
  methods: { },
  computed: { },
  components: {
    LocalButton,
    LoginButton
  }
};
</script>
