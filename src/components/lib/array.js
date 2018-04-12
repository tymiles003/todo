export default (() => {
  let obj = {};

  obj.getItemInObjArrByID = (id, array) => {
    for (var i = 0; i <= array.length; i++) {
      if (String(array[i].id) === String(id)) {
        return {
          index: i,
          object: array[i]
        };
      }
    }
    return false;
  };
  return obj;
})();
