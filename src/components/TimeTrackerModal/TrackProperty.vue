<template>
  <div>
    <table class="text-left" style="table-layout: fixed;">
      <tr>
        <td class="pr-3">ID</td>
        <td class="pl-3">{{todo.id}}</td>
      </tr>
      <tr>
        <td class="pr-3">Category</td>
        <td class="pl-3">{{getCategoryName(todo.categoryId)}}</td>
      </tr>
      <tr>
        <td class="pr-3">Text</td>
        <td class="pl-3">
          <div class="input-group">
          <input
            type="text"
            class="form-control"
            :value="todo.text"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">
                Ok
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="pr-3">createdTime</td>
        <td class="pl-3">{{getCreationTime(todo.time.createdTime)}}</td>
      </tr>
      <tr>
        <td class="pr-3">Sort</td>
        <td class="pl-3">{{todo.sort}}</td>
      </tr>
      <tr>
        <td class="pr-3">Status</td>
        <td class="pl-3">{{todo.status}}</td>
      </tr>
      <tr>
        <td class="pr-3">Action</td>
        <td class="pl-3">{{todo.action}}</td>
      </tr>
    </table>
    <!-- remove me!!!!1 -->
    <!-- <pre class="text-left hidden">{{todo}}</pre> -->
  </div>
</template>

<script>
// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// eslint-disable-next-line
import momentTimer from 'moment-timer';

export default {
  name: 'TrackProperty',
  props: ['todo'],
  data () {
    return { };
  },
  methods: {
    getCategoryName (id) {
      return this.$store.getters['UserData/getCategoryById'](id)[0].name;
    },
    getCreationTime (ms) {
      return moment(ms).format('DD.MM.YYYY -- HH:mm:ss');
    }
  },
  computed: { },
  components: { }
};
</script>
