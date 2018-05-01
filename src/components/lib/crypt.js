import CryptoJS from 'crypto-js';

export default (() => {
  let obj = {};

  obj.SHA512 = (data) => {
    return CryptoJS.SHA512(String(data));
  }

  obj.crypt = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  }

  obj.decrypt = (data, key) => {
    let bytes = CryptoJS.AES.decrypt(data.toString(), key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  return obj;
})();
