export const LoginDataMutations = {
  setLogin (state, newValue) {
    state.LoginData.login = newValue;
  },
  setToken (state, newValue) {
    state.LoginData.token = newValue;
  },
  setLastLogin (state, newValue) {
    state.LoginData.lastLogin = newValue;
  },
  setExpiration (state, newValue) {
    state.LoginData.expiration = newValue;
  },
  login (state, objArg) {
    this.commit('LoginData/setLogin',objArg.login);
    this.commit('LoginData/setToken',objArg.token);
    this.commit('LoginData/setLastLogin',objArg.lastLogin);
  }
};
