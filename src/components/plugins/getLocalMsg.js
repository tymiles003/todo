const getLocalMsg = {
  install (Vue){
    Vue.prototype.getLocalMsg = function (key) {
        // console.log('iam plugin! hello motherFucker!');
        let lib = this.$store.getters.currentLib;
        let def = this.$store.getters.localLib('en');
        return lib[key] || def[key];
    }
  }
};

export default getLocalMsg;
