import CryptoJS from 'crypto-js';
window.CryptoJS = CryptoJS;
export default (() => {
  let obj = {};

  obj.SHA512 = (data) => {
    return CryptoJS.SHA512(String(data));
  };

  obj.wrap = (data) => {
    let rawData = data;
    let round1 = btoa(rawData);
    let round2 = CryptoJS.enc.Utf8.parse(round1).toString();
    return round2;
  };

  obj.unwrap = (data) => {
    let rawData = data;
    let round2 = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Hex.parse(rawData)
    );
    let round1 = atob(round2);
    return round1;
  };

  obj.crypt = (data, key) => {
    return obj.wrap(CryptoJS.AES.encrypt(data, key).toString());
  };

  obj.decrypt = (data, key) => {
    let bytes = CryptoJS.AES.decrypt(obj.unwrap(data.toString()), key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return obj;
})();
