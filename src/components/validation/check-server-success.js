import validator from 'vue-m-validator';
export const serverCheckSuccess = {
  serverCheckSuccess (response, objArr) {
    const NAME = objArr.name || 'unknown';
    try {
      response = JSON.parse(response);
    } catch (err) {
      console.log(err);
      console.log(response);
    }

    function haseErrorByName (errorArray, ruleErrorName) {
      if(errorArray===undefined) return false;
      if(typeof errorArray != 'object') return false;
      if(errorArray.length === 0) return false;
      for (let item of errorArray) {
        if(item.hasOwnProperty('name')){
          if(item.name === ruleErrorName){
            return true;
          }
        }
      }
      return false;
    }

    if (
      response.hasOwnProperty('status') &&
      (response.status === false && haseErrorByName(response.errors, NAME))
    ) {
      response.errors.forEach((item, i, arr) => {
        if (NAME === item.name) {
          item.msgs.forEach((msg, y, msgs) => {
            validator.addError({
              expression: true,
              name: NAME,
              msg: msg
            });
          });
        }
      });
    } else {
      validator.deleteAllErrorByName(NAME);
    }
  }
};
