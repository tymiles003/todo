import CryptoJS from 'crypto-js';
window.CryptoJS = CryptoJS;
export default (() => {
  let obj = {};

  obj.SHA512 = (data) => {
    return CryptoJS.SHA512(String(data));
  };

  obj.wrap = (data) => {
    let rawData = data;
    let round1 = CryptoJS.enc.Utf8.parse(rawData).toString();
    let round2 = btoa(round1);
    let round3 = CryptoJS.enc.Utf8.parse(round2).toString();

    return round3;
  };

  obj.unwrap = (data) => {
    let rawData = data;
    let round3 = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Hex.parse(rawData)
    );

    let round2 = atob(round3);

    let round1 = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Hex.parse(round2)
    );
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
