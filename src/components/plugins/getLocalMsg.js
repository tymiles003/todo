const getLocalMsg = {
  install (Vue) {
    Vue.prototype.getLocalMsg = function (key) {
      // console.log('iam plugin! hello motherFucker!');
      let lib = this.$store.getters['UserData/currentLib'];
      let def = this.$store.getters['UserData/localLib']('en');
      return lib[key] || def[key];
    };
  }
};

export default getLocalMsg;
