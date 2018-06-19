<template>
  <div class="d-inline-block mr-4">
    <button
      class="btn btn-link"
      @click="exit">Выйти</button>
  </div>
</template>

<script>
export default {
  name: 'ExitButton',
  data () {
    return { };
  },
  methods: {
    exit () {
      this.$store.commit('UserData/updateLogin', {
        token: null,
        lastLogin: null
      });
      this.$store.commit('LoginData/exit');
    }
  },
  computed: { }
};
</script>
