export const mounted = function () {
  this.animStates.newTextVisible = true;
  this.todoList = this.$store.getters['UserData/all'];
  this.storeLength = this.$store.getters['UserData/length'];
  this.sortByCategory();
};
