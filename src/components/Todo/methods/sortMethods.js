export const sortMethods = {
  sortByDefault () {
    this.todoList = this.$store.getters['UserData/all'];
  },
  sortByStatus (status) {
    this.todoList = this.$store.getters['UserData/statusSort'](status);
  },
  sortByTime (intSortFlag) {
    this.todoList = this.$store.getters['UserData/timeSort'](intSortFlag);
  },
  sortByCategory (_id) {
    let id = _id || this.$store.state.UserData.todoList.selectedCategory;
    this.todoList = this.$store.getters['UserData/categorySort'](id);
    this.todoList = this.$store.getters['UserData/all'];
  }
};
