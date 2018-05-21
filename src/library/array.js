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

  obj.equalArray = (arr, callback) => {
    for (var i = 0; i < arr.length; i++) {
      if (!callback(arr[i])) {
        return false;
      }
    }
    return true;
  };

  obj.updateArray = (arr, callback) => {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = callback(arr[i]);
    }
    return arr;
  };

  return obj;
})();
