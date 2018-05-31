<template>
  <form class="text-left">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input type="text" class="form-control" placeholder="Enter username">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" placeholder="Enter email">
      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" placeholder="Password">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password again">
      <small id="emailHelp" class="form-text text-muted">input password again</small>

    </div>
    <button type="button" class="btn btn-primary">Зарегистрироваться</button>
  </form>
</template>

<script>
// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

export default {
  name: 'RegistrationForm',
  data () {
    return { };
  },
  methods: { },
  computed: { },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
