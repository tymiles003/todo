export default (() => {
  let obj = {};

  obj.rndMinMax = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  obj.rndMinMaxInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  obj.rndCoinInt = () => {
    /**
       * случайный 0 или 1
       */
    return ~~Math.floor(Math.random() * 2);
  };

  obj.rndCoinBool = () => {
    /**
       * случайный true или false
       */
    return (~~Math.floor(Math.random() * 2) === 0);
  };

  obj.rndCoinFlip = (a, b) => {
    /**
       * случайный a или b
       */
    return (~~Math.floor(Math.random() * 2) === 0) ? a : b;
  };

  obj.uniqArrayInt = (length, min, max) => {
    var unq = [];
    var rnd = 0;
    var flag = false;
    if (max - min < length) {
      length = max - min;
    }
    while (unq.length < length) {
      rnd = obj.rndMinMaxInt(min, max);
      flag = false;
      for (var i = 0; i < unq.length; i++) {
        if (unq[i] === rnd) { flag = true; break; }
      }
      if (!flag) {
        unq.push(rnd);
      }
    }// while
    return unq;
  };

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
