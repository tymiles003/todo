export const actionsMethods = {
  itemEdit (id) {
    this.editEndAll();
    let item = this.getItem(id).object;
    item.action = this.actns.EDIT;
  },
  editEndAll () {
    for (var i = 0; i <= this.$store.state.UserData.todoList.items.length - 1; i++) {
      this.$store.state.UserData.todoList.items[i].action = this.actns.DEFAULT;
    }
  }
};
