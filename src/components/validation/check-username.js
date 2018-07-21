import validator from 'vue-m-validator';
export const checkUsername = {
  checkUsername (_username) {
    const NAME = 'username';
    const USERNAME = _username.trim();
    const RULE_1 = {
      expression: !USERNAME || USERNAME === '',
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_USERNAMEREQ')
    };
    /* eslint-disable-next-line */
    const RULE_2_REGEXP = new RegExp('^[a-zA-Z0-9_-]+$');
    const RULE_2 = {
      expression: !(RULE_2_REGEXP.test(USERNAME)),
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_USERNAMEVALID')
    };
    const RULE_3 = {
      expression: USERNAME.length > 128,
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_USERNAMELONG')
    };
    const RULE_4 = {
      expression: USERNAME.length < 3 && USERNAME.length !== 0,
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_USERNAMESHORT')
    };

    validator
      .addRule(RULE_1)
      .addRule(RULE_2)
      .addRule(RULE_3)
      .addRule(RULE_4)
      .serverCheck({
        address: 'http://rest3/registration',
        method: 'POST',
        data: {
          name: NAME,
          [NAME]: USERNAME
        },
        success: (response) => {
          this.serverCheckSuccess(response, {name: NAME});
        },
        error: (response) => { console.log(response); }
      });
    this.notFirst();
  }
};
