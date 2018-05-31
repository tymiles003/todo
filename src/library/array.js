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

  obj.getItemInObjArrByKey = (key, value, array) => {
    if (!key && value) return;
    if (array.length === 0) return;
    for (let i = 0; i <= array.length; ++i) {
      if (!array[i]) return;
      if (String(array[i][key]) === String(value)) {
        return {
          index: i,
          object: array[i]
        };
      }
    }
    return false;
  };

  obj.deleteItemArrByElement = (element, array) => {
    let keys = [];
    array.forEach((item, i, arr) => {
      if (item === element) {
        keys.push(i);
      }
    });
    keys.forEach((item, i, arr) => {
      array.splice(item, item + 1);
    });
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
