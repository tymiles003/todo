<template>
  <div>
    <form class="text-left" v-if="!isComplite">
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
        <label>{{this.getLocalMsg('SGN_LABEL_USERNAME')}}</label>
        <input
          type="text"
          class="form-control"
          v-bind:class="{'text-danger':isUsernameErrors,'is-invalid':isUsernameErrors}"
          v-model="username"
          :placeholder="this.getLocalMsg('SGN_PLACEHOLDER_USERNAME')"
          @blur="checkUsername(username, extraAddr)">
          <ul v-if="isUsernameErrors">
            <li
            class="form-text text-danger"
            v-for="(error, index) in validator.getErrors('username')"
            v-bind:key="index">
                &nbsp;{{ error }}
            </li>
          </ul>
      </div>
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
          @blur="checkPassword(password)">
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          :placeholder="this.getLocalMsg('SGN_PLACEHOLDER_PASS2')"
          v-model="password2"
          @blur="checkPassword(password, password2)">
        <small id="emailHelp" class="form-text text-muted">{{this.getLocalMsg('SGN_TEXT_PASSAGAIN')}}</small>
      <ul class="form-group">
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
          disabled>{{this.getLocalMsg('SGN_LABEL_REGST')}}</button>
        <button
          v-if="isEnabled"
          type="button"
          class="btn btn-primary"
          @click="register">{{this.getLocalMsg('SGN_LABEL_REGST')}}</button>
      </div>
    </form>
    <div class="statusWork" v-if="isComplite">
      <div class="soccess">
        <h5 class="card-title" :class="{ 'text-danger': isError, 'text-success': !isError }">{{statusCompliteMsg.title}}</h5>
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
import {validationRegistrationMethods} from '@/components/validation/validation-registration-methods';

export default {
  name: 'RegistrationForm',
  data () {
    return {
      server: 'http://rest3',
      extraAddr: '/registration',
      isFirstRun: true,
      isComplite: false,
      isError: false,
      username: '',
      email: '',
      password: '',
      password2: '',
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
    ...validationRegistrationMethods,
    notFirst () {
      this.isFirstRun = false;
    },

    formDataClean () {
      this.username = '';
      this.email = '';
      this.password = '';
      this.password2 = '';
    },
    checkForm () {
      this.checkUsername(this.username, this.extraAddr);
      this.checkEmail(this.email, this.extraAddr);
      this.checkPassword(this.password, this.password2);
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
          let response = JSON.parse(e);
          // console.log(response);
          if (response.status === true) {
            this.isError = false;
            this.formDataClean();
            this.showCompliteStatus({
              title: 'Вы успешно зарегистрировались',
              body: 'Теперь вы можете воспользоваться формой входа',
              extra: 'Удачи!'
            });
          }else{
            this.isError = true;
            let errors = [];

            response.errors.forEach((item, i, arr)=>{
              item.msgs.forEach((item2, i2, arr2)=>{
                errors.push(item2);
              });
            });

            this.showCompliteStatus({
              title: 'Ошибка',
              body: `${errors.join('; ')}`,
              extra: 'Удачи!'
            });
          }
          // console.log(e, response);
        })
        .error((e) => { console.log(e); })
        .send(sendDataObject);
    },
    register () {
      this.checkForm();
      if (this.validator.errors.length === 0) {
        this.isError = true;
        this.sendData({
          'username': this.username,
          'email': this.email,
          'password': this.password,
          'password_again': this.password2
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
    },
    isUsernameErrors () {
      let errors = this.validator.getErrors('username');
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
