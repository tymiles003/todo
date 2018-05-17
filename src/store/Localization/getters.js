export const LocalizationGetters = {
  localLib (state, getters, rootState, RootGetters) {
    return (key) => {
      return {...state.localizationLib[key]};
    };
  },
  currentLib (state, getters, rootState, RootGetters) {
    return {...state.localizationLib[RootGetters['UserData/getCurrentLocal']]};
  }
};
