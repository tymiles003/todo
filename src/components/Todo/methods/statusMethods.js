// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// eslint-disable-next-line
import momentTimer from 'moment-timer';

export const statusMethods = {
  statusDone (id) {
    let object = this.getItem(id);
    let index = object.index;
    let item = object.object;
    item.status = this.stats.DONE;
    this.updateDuration(id);
    this.$store.commit('UserData/update', {
      index: index,
      object: item
    });
    this.$store.commit('Notify/addNotify', {
      text: this.getLocalMsg('NTF_MSG_TASKEND'),
      duration: 5
    });
  },
  statusRunning (id) {
    this.pausedAll();
    let object = this.getItem(id);
    let index = object.index;
    let item = object.object;
    item.status = this.stats.RUNNING;
    item.time.startTime = parseInt(moment().format('x'));
    item.time.track.push({
      startTime: parseInt(moment().format('x')),
      duration: 0
    });
    // let timer = moment.duration(moment.duration(25, 'minutes').asMilliseconds()).timer(() => {
    //   this.statusPaused(id);
    // });
    // timer.start();
    this.$store.commit('UserData/update', {
      index: index,
      object: item
    });
    this.$store.commit('Notify/addNotify', {
      text: this.getLocalMsg('NTF_MSG_TASKRUN'),
      duration: 5
    });
  },
  statusPaused (id) {
    let object = this.getItem(id);
    let index = object.index;
    let item = object.object;
    item.status = this.stats.PAUSED;
    this.updateDuration(id);
    this.$store.commit('UserData/update', {
      index: index,
      object: item
    });
  },
  pausedAll () {
    for (var i = 0; i <= this.$store.state.UserData.todoList.items.length - 1; i++) {
      if (this.$store.state.UserData.todoList.items[i].status === this.stats.RUNNING) {
        this.statusPaused(this.$store.state.UserData.todoList.items[i].id);
      }
    }
  }
};
