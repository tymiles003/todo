<template>
  <div>
    <form class="text-left"  v-if="!isComplite">
      <ul class="form-group">
        <li
          v-for="(error, index) in validator.errors"
          v-bind:key="index">
          <small
            class="form-text text-muted"
            v-for="(msg, index) in error.msgs"
            v-bind:key="index">{{msg}}</small>
        </li>
      </ul>
      <div class="form-group">
        <label>{{this.getLocalMsg('SGN_LABEL_EMAIL')}}</label>
        <input
          type="email"
          name="email"
          class="form-control"
          v-bind:class="{'text-danger':isMailErrors,'is-invalid':isMailErrors}"
          :placeholder="this.getLocalMsg('SGN_PLACEHOLDER_EMAIL')"
          v-model="email"
          @blur="checkEmail(email, extraAddr)">
          <ul v-if="isMailErrors">
            <li
            class="form-text text-danger"
            v-for="(error, index) in validator.getErrors('email')"
            v-bind:key="index">
                &nbsp;{{ error }}
            </li>
          </ul>
      </div>
      <div class="form-group">
        <label>{{this.getLocalMsg('SGN_LABEL_PASS')}}</label>
        <input
          type="password"
          name="password"
          class="form-control"
          v-bind:class="{'text-danger':isPassErrors,'is-invalid':isPassErrors}"
          :placeholder="this.getLocalMsg('SGN_PLACEHOLDER_PASS')"
          v-model="password"
          @blur="checkPassword(password, password)">
          <ul>
            <li
            class="form-text text-danger"
            v-for="(error, index) in validator.getErrors('pass')"
            v-bind:key="index">
                &nbsp;{{ error }}
            </li>
          </ul>
      </div>
      <div class="form-group" >
        <button
          v-if="isDisabled"
          type="button"
          class="btn btn-primary"
          disabled>{{this.getLocalMsg('SGN_LABEL_LOGIN')}}</button>
        <button
          v-if="isEnabled"
          type="button"
          class="btn btn-primary"
          @click="login">{{this.getLocalMsg('SGN_LABEL_LOGIN')}}</button>
      </div>
    </form>
    <div class="statusWork" v-if="isComplite">
      <div class="soccess">
        <h5 class="card-title text-success">{{statusCompliteMsg.title}}</h5>
        <p class="card-text">{{statusCompliteMsg.body}}</p>
        <p class="card-text">{{statusCompliteMsg.extra}}</p>
      </div>
      <div class="error hide"></div>
    </div>
  </div>
</template>

<script>

import validator from 'vue-m-validator';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

// -----libs:
import ajax from '@/library/ajax';

// -----methods:
import {validationLoginMethods} from '@/components/validation/validation-login-methods';

export default {
  name: 'LoginForm',
  data () {
    return {
      server: 'http://rest3',
      extraAddr: '/login',
      isFirstRun: true,
      isComplite: false,
      email: '',
      password: '',
      statusCompliteMsg: {
        title: '',
        body: '',
        extra: ''
      },
      validator: validator
    };
  },
  created () {
    validator.reset();
  },
  methods: {
    ...validationLoginMethods,
    notFirst () {
      this.isFirstRun = false;
    },
    formDataClean () {
      this.email = '';
      this.password = '';
    },
    checkForm () {
      this.checkEmail(this.email, this.extraAddr);
      this.checkPassword(this.password, this.password);
    },
    showCompliteStatus (objMsg) {
      this.statusCompliteMsg = objMsg;
      this.isComplite = true;
    },
    sendData (sendDataObject) {
      ajax
        .request({
          address: this.server + this.extraAddr,
          method: 'POST'
        })
        .complete((e) => {
          let responce = "";
          try {
            responce = JSON.parse(e);
          } catch (err) {
            responce = e;
            console.log(err);
            console.log(response);
          }
          if (responce.status === true) {
            this.formDataClean();
            this.showCompliteStatus({
              title: 'Вы успешно вошли',
              body: `Хелло ${responce.data.username}!`,
              extra: 'Чувствуй себя как дома!'
            });
          }
          this.$store.commit('LoginData/login', {
            login: responce.data.username,
            token: responce.api_token,
            lastLogin: responce.data.updated_at
          });
          this.$store.commit('UserData/updateLogin', {
            token: responce.api_token,
            lastLogin: responce.data.updated_at
          });
          // this.sync.synchronizationLocalToRemote(this.$store);
        })
        .error((e) => { console.log(e); })
        .send(sendDataObject);
    },

    login () {
      this.checkForm();
      if (this.validator.errors.length === 0) {
        this.sendData({
          'email': this.email,
          'password': this.password,
          'password_again': this.password
        });
      }
    }
  },
  computed: {
    isDisabled () {
      return this.isFirstRun === true || this.validator.errors.length > 0;
    },
    isEnabled () {
      return this.isFirstRun === false && this.validator.errors.length === 0;
    },
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
