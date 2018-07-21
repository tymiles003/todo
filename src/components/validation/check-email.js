import validator from 'vue-m-validator';
export const checkEmail = {
  checkEmail (_mail, strExtraAddr = '') {
    const NAME = 'email';
    const MAIL = _mail.trim();
    const RULE_1 = {
      expression: !MAIL || MAIL === '',
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_EMAILREQ')
    };
    /* eslint-disable-next-line */
    const RULE_2_REGEXP = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
    const RULE_2 = {
      expression: !(RULE_2_REGEXP.test(MAIL)),
      name: NAME,
      msg: this.getLocalMsg('SGN_VALIDATION_EMAILVALID')
    };

    validator
      .addRule(RULE_1)
      .addRule(RULE_2)
      .serverCheck({
        address: this.server + strExtraAddr,
        method: 'POST',
        data: {
          name: NAME,
          [NAME]: MAIL
        },
        success: (response) => {
          this.serverCheckSuccess(response, {name: NAME});
        },
        error: (response) => { console.log(response); }
      });
    this.notFirst();
  }
};
