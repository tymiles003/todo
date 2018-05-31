<template>
  <div class="d-inline-block mr-4">
    <button
      class="btn btn-link"
      @click="showMeBeautifulPopup">Войти</button>
  </div>
</template>

<script>
export default {
  name: 'LoginButton',
  data () {
    return { };
  },
  methods: {
    showMeBeautifulPopup () {
      this.$emit('show');
    }
  },
  computed: { }
};
</script>
