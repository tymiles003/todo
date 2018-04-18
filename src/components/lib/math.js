export default (() => {
  let obj = {};
  obj.getPersentOfValues = (intValue, intMax) => {
    if (parseInt(intValue) === 0 || parseInt(intMax) === 0) return 0;
    return 100 / (parseInt(intMax) / parseInt(intValue));
  };

  obj.getPersentOfMax = (intValue, intMax) => {
    if (parseInt(intValue) === 0 || parseInt(intMax) === 0) return 0;
    return (parseInt(intValue) * 100) / parseInt(intMax);
  };
  obj.getMiddle = (arr) => {
    let sum = arr.reduce((sum, current) => {
      // eslint-disable-next-line
      return sum += current;
    }, 0);
    return sum / arr.length;
  };
  obj.getMiddleArray = (arr, limit) => {
    if (!limit && isNaN(parseInt(limit)) && parseInt(limit) === 0) {
      limit = 1;
    }
    if (arr.length === 0) {
      return 0;
    }
    let count = 0;
    let newArr = [...arr];
    let flag = true;
    let tmpArr = [];
    while (flag) {
      if (newArr[count + 1] !== undefined) {
        tmpArr.push(obj.getMiddle([newArr[count], newArr[count + 1]]));
      }
      if (count > newArr.length) {
        count = -1;
        newArr = [...tmpArr];
        tmpArr = [];
      };
      if (newArr.length <= limit) {
        flag = false;
      }
      count++;
    }
    return newArr;
  };

  window.math = obj;
  return obj;
})();
