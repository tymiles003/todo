export const tracksMethods = {
  showTracks (id) {
    let object = this.getItem(id);
    let index = object.index;
    let item = object.object;
    this.showingTracks = item.time.track;
    this.showingTodo = item;
    this.trackerShow = true;
  },
  hideTracks () {
    this.trackerShow = false;
    this.showingTracks = {};
    this.showingTodo = {};
  }
};
