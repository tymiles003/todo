<template>
  <div>
    <ul>
      <li>ID: {{todo.id}}</li>
      <li>Category: {{getCategoryName(todo.categoryId)}}</li>
      <li>Text: {{todo.text}}</li>
      <li>createdTime: {{getCreationTime(todo.time.createdTime)}}</li>
      <li>Sort: {{todo.sort}}</li>
      <li>Status: {{todo.status}}</li>
      <li class="hide">Action: {{todo.action}}</li>
    </ul>
    <pre>{{$store.state}}</pre>
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
      return this.$store.getters.getCategoryById(id)[0].name;
    },
    getCreationTime (ms) {
      return moment(ms).format('DD.MM.YYYY -- HH:mm:ss');
    }
  },
  computed: { },
  components: { }
};
</script>
