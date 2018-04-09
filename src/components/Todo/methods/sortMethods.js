export const sortMethods = {
  sortByDefault () {
    this.todoList = this.$store.getters.all;
  },
  sortByStatus (status) {
    this.todoList = this.$store.getters.statusSort(status);
  },
  sortByTime (intSortFlag) {
    this.todoList = this.$store.getters.timeSort(intSortFlag);
  }
};
