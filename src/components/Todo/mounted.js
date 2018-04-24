export const mounted = function () {
  this.animStates.newTextVisible = true;
  this.todoList = this.$store.getters.all;
  this.storeLength = this.$store.getters.length;
  this.sortByCategory();
};
