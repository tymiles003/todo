export const sortMethods = {
  sortByDefault () {
    this.todoList = this.$store.getters.all;
  },
  sortByStatus (status) {
    this.todoList = this.$store.getters.statusSort(status);
  },
  sortByTime (intSortFlag) {
    this.todoList = this.$store.getters.timeSort(intSortFlag);
  },
  sortByCategory (_id) {
    let id = _id || this.$store.state.todoList.selectedCategory;
    this.todoList = this.$store.getters.categorySort(id);
  }
};
