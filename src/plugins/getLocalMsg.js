const getLocalMsg = {
  install (Vue) {
    Vue.prototype.getLocalMsg = function (key) {
      // console.log('iam plugin! hello motherFucker!');
      let lib = this.$store.getters['Localization/currentLib'];
      let def = this.$store.getters['Localization/localLib']('en');
      return lib[key] || def[key];
    };
  }
};

export default getLocalMsg;
