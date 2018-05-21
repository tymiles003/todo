export default (() => {
  let obj = {};

  obj.complement = (jsonObj, template) => {
    for (var variable in template) {
      if (!jsonObj.hasOwnProperty(variable)) {
        jsonObj[variable] = template[variable];
      }
    }
    return jsonObj;
  };

  obj.clippingPropertys = (jsonObj, arrPropertys) => {
    for (var variable of arrPropertys) {
      if (jsonObj.hasOwnProperty(variable)) {
        delete jsonObj[variable];
      }
    }
    return jsonObj;
  };

  return obj;
})();
