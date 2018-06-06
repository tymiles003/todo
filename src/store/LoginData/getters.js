export const LoginDataGetters = {
  getLogin (state) {
    return state.LoginData.login;
  },
  getToken (state) {
    return state.LoginData.token;
  },
  getLastLogin (state) {
    return state.LoginData.lastLogin;
  },
  getExpiration (state) {
    return state.LoginData.expiration;
  },
  getAll (state) {
    return state.LoginData;
  }
};
