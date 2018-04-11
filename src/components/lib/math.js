export default (() => {
  let obj = {};
  obj.getPersentOfValues = (intValue, intMax) => {
    if (intValue === 0 || intMax === 0) return 0;
    return 100 / (parseInt(intMax) / parseInt(intValue));
  };
  return obj;
})();
