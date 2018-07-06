import ajax from '@/library/ajax';

const sync = {
  install (Vue) {
    Vue.prototype.sync = {
      serverProtocol: 'http',
      serverAddress: 'todoserver',
      serverRequestAddress: 'add-todos',
      serverRequestMethod: 'POST',
      checkToken (store) {
        // TODO: сделать проверку на протухание токена
        let token = store.getters['UserData/getLoginDataToken'];
        if (token && token !== '') {
          return token;
        } else {
          return false;
        }
      },
      getFullRequestString (_objArg) {
        let objArg = _objArg || {};
        let protocol = objArg.serverProtocol || this.serverProtocol;
        let address = objArg.serverAddress || this.serverAddress;
        let requestAddress = objArg.serverRequestAddress || this.serverRequestAddress;
        let token = objArg.token || '';
        return `${protocol}://${address}/${requestAddress}`;
      },
      synchronizationLocalToRemote (store) {
        let token = this.checkToken(store);
        if (!token) return false;
        let objectSend = {};
        objectSend.token = token;
        objectSend.userData = JSON.stringify(store.getters['UserData/getFullState']);
        console.log(JSON.stringify(objectSend));

        ajax
          .request({
            // address: 'http://rest/test',
            address: this.getFullRequestString(),
            method: this.serverRequestMethod
          })
          .complete((e) => {
            let responce = JSON.parse(e);
            console.log(responce);
            if (responce.status === true) { }
          })
          .error((e) => {
            console.error('Error: ', e);
          })
          .send(objectSend);
      },// synchronizationLocalToRemote

      add (store, sendObject) {
        let token = this.checkToken(store);
        if (!token) return false;
        let objectSend = {};
        objectSend.token = token;
        objectSend.userData = JSON.stringify(sendObject);
        console.log(JSON.stringify(sendObject));

        ajax
          .request({
            // address: 'http://rest/test',
            address: this.getFullRequestString({
              serverRequestAddress: 'add-todos'
            }),
            method: this.serverRequestMethod
          })
          .complete((e) => {
            let responce = JSON.parse(e);
            console.log(responce);
            if (responce.status === true) { }
          })
          .error((e) => {
            console.error('Error: ', e);
          })
          .send(objectSend);
      }// add
    };// Vue.prototype.sync
  }// install
};

export default sync;
