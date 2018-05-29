export default (() => {
  let obj = {};
  obj.json2form = (json) => {
    let urlEncodedData = '';
    let urlEncodedDataPairs = [];
    for (let name in json) {
      urlEncodedDataPairs.push(
        encodeURIComponent(name) + '=' + encodeURIComponent(json[name])
      );
    }
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    return urlEncodedData;
  };
  obj.request = (arg) => {
    if (!arg.address) return false;
    let address = arg.address;
    let method = arg.method || 'GET';
    var XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    obj.xhr = new XHR();
    obj.xhr.open(method, address, true);
    return obj;
  };
  obj.complete = (callback) => {
    if (!callback) return false;
    obj.xhr.onload = function () {
      callback(this.responseText);
    };
    return obj;
  };
  obj.error = (callback) => {
    if (!callback) return false;
    obj.xhr.onerror = function () {
      callback(this.status);
    };
    return obj;
  };
  obj.send = (arg) => {
    let urlEncodedData = obj.json2form(arg);
    obj.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    obj.xhr.send(urlEncodedData);
  };

  return obj;
})();
