export const mounted = function () {
  this.animStates.newTextVisible = true;
  this.todoList = this.$store.getters['UserData/all'];
  this.storeLength = this.$store.getters['UserData/length'];
  this.sortByCategory();
  let tmplArray = [];
  this.$dragging.$on('dragged', ({ value }) => {
    tmplArray = [...value.list];
  });
  this.$dragging.$on('dragend', () => {
    let count = tmplArray.length;
    for (let variable of tmplArray) {
      variable.sort = --count;
    }
    this.$store.commit('UserData/updateAll', tmplArray);
  });
};
