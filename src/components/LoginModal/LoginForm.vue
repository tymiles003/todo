<template>
  <form class="text-left">
    <ul class="form-group">
      <li
        v-for="error in validator.errors">
        <small
          class="form-text text-muted"
          v-for="msg in error.msgs">{{msg}}</small>
      </li>
    </ul>
    <div class="form-group">
      <label>Email address</label>
      <input
        type="email"
        name="email"
        class="form-control"
        v-bind:class="{'text-danger':isMailErrors,'is-invalid':isMailErrors}"
        placeholder="Enter email"
        v-model="email"
        @blur="checkMail(email)">
        <ul v-if="isMailErrors">
          <li
          class="form-text text-danger"
          v-for="error in validator.getErrors('email')">
              &nbsp;{{ error }}
          </li>
        </ul>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        class="form-control"
        v-bind:class="{'text-danger':isPassErrors,'is-invalid':isPassErrors}"
        placeholder="Password"
        v-model="password"
        @blur="checkPassword(password)">
        <ul>
          <li
          class="form-text text-danger"
          v-for="error in validator.getErrors('pass')">
              &nbsp;{{ error }}
          </li>
        </ul>
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="login">Войти</button>
  </form>
</template>

<script>
// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

import validator from '@/library/validator';

export default {
  name: 'LoginForm',
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      validator: validator
    };
  },
  methods: {

    checkMail (_mail) {
      const MAIL = _mail.trim();
      const RULE_1 = {
        expression: !MAIL || MAIL === '',
        name: 'email',
        msg: 'email field required'
      };
      const RULE_2 = {
        expression: !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(MAIL)),
        name: 'email',
        msg: 'email is not valid'
      };
      const RULE_3 = {
        expression: !(MAIL === 'ad@ad.ad'),
        name: 'email',
        msg: 'email rule3'
      };
      validator
        .addRule(RULE_1)
        .addRule(RULE_2)
        .addRule(RULE_3);
    },
    checkPassword (pass) {
      const RULE_1 = {
        expression: !pass || pass === '',
        name: 'pass',
        msg: 'pass field required'
      };
      validator
        .addRule(RULE_1);
    },
    checkForm () {
      this.checkMail(this.email);
      this.checkPassword(this.password);
    },
    login () {
      this.checkForm();
    }
  },
  computed: {
    isMailErrors () {
      let errors = this.validator.getErrors('email');
      return errors && errors.length > 0;
    },
    isPassErrors () {
      let errors = this.validator.getErrors('pass');
      return errors && errors.length > 0;
    }
  },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
