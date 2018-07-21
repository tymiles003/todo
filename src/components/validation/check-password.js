import validator from 'vue-m-validator';
export const checkPassword = {
  checkPassword (pass, pass2) {
    const RULE_1 = {
      expression: !pass || pass === '',
      name: 'pass',
      msg: this.getLocalMsg('SGN_VALIDATION_PASSREQ')
    };
    const RULE_2 = {
      expression: pass !== pass2,
      name: 'pass',
      msg: this.getLocalMsg('SGN_VALIDATION_PASSMATCH')
    };
    validator
      .addRule(RULE_1)
      .addRule(RULE_2);
    this.notFirst();
  }
};
