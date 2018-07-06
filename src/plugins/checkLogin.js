import ajax from '@/library/ajax';

const checkLogin = {
  install (Vue) {
    Vue.prototype.checkLogin = {
      serverProtocol: 'http',
      serverAddress: 'todoserver',
      serverRequestAddress: 'user',
      serverRequestParametr: 'api_token',
      serverRequestMethod: 'GET',

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
        let requestParametr = objArg.serverRequestParametr || this.serverRequestParametr;
        let token = objArg.token || '';
        return `${protocol}://${address}/${requestAddress}?${requestParametr}=${token}`;
      },

      checkLoginData (store) {
        let token = this.checkToken(store);
        if (!token) return false;
        ajax
          .request({
            // address: 'http://rest/test',
            address: this.getFullRequestString({token: token}),
            method: this.serverRequestMethod
          })
          .complete((e) => {
            let responce = JSON.parse(e);
            if (responce.status === true) {
              // если есть токен
              // console.log('look at my horse! My horse is amaizing!', responce);
              store.commit('LoginData/login', {
                login: responce.message.username,
                token: responce.api_token,
                lastLogin: responce.message.updated_at
              });
            }
          })
          .error((e) => {
            console.error('Error: ', e);
          })
          .send();
      }// checkLoginData
      
    };// Vue.prototype.checkLogin
  }// install
};

export default checkLogin;
