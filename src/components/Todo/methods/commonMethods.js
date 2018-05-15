// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';

// -----other:
import array from '@/components/lib/array';

export const commonMethods = {
  updateDuration (id) {
    let item = this.getItem(id).object;
    let startTime = moment(item.time.startTime);

    let diff = moment.duration(moment().diff(startTime));
    let duration = moment.duration(item.time.pastTime.duration);
    let newDuration = duration.add(diff.asMilliseconds(), 'ms').asMilliseconds();

    item.time.pastTime.duration = newDuration;
    item.time.pastTime.render = duration.format('hh:mm:ss', {
      trim: false
    });
    item.time.startTime = null;

    if (item.time.track.length !== 0 && item.time.track[item.time.track.length - 1].duration === 0) {
      item.time.track[item.time.track.length - 1].duration = diff.asMilliseconds();
    }
  },
  getItem (id) {
    return array.getItemInObjArrByID(id, this.$store.state.UserData.todoList.items);
  }
};
