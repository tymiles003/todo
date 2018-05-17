import CryptoJS from 'crypto-js';
window.CryptoJS = CryptoJS;
export default (() => {
  let obj = {};

  obj.SHA512 = (data) => {
    return CryptoJS.SHA512(String(data));
  };

  obj.wrap = (data) => {
    let rawData = data;
    let round_1 = CryptoJS.enc.Utf8.parse( rawData ).toString();
    let round_2 = btoa(round_1);
    let round_3 = CryptoJS.enc.Utf8.parse( round_2 ).toString();

    return round_3;
  }

  obj.unwrap = (data) => {
    let rawData = data;
    let round_3 = CryptoJS.enc.Utf8.stringify(
                CryptoJS.enc.Hex.parse(rawData)
              );

    let round_2 = atob(round_3);

    let round_1 = CryptoJS.enc.Utf8.stringify(
                  CryptoJS.enc.Hex.parse(round_2)
                );
    return round_1;
  }

  obj.crypt = (data, key) => {
    return obj.wrap(CryptoJS.AES.encrypt(data, key).toString());
  };

  obj.decrypt = (data, key) => {
    let bytes = CryptoJS.AES.decrypt(obj.unwrap(data.toString()), key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  return obj;
})();
