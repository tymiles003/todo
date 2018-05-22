<template>
  <div>
    <table class="text-left propertys-teble">
      <tr class="noeditable">
        <td class="pr-3">ID</td>
        <td class="pl-3">{{todo.id}}</td>
      </tr>
      <tr class="editable">
        <td class="pr-3">Category</td>
        <td class="pl-3">
          <b-dropdown
            id="ddown1"
            :text="getCategoryName(selectedCategory)"
            class="m-md-2"
            variant="light"
            size="sm">
            <b-dropdown-item
              v-for="item in $store.getters['UserData/getAllCategories']"
              v-bind:key="item.id"
              @click="selectCategory(item.id)">
                {{item.name}}
            </b-dropdown-item>
          </b-dropdown>
        </td>
      </tr>
      <tr class="editable">
        <td class="pr-3" @click="startEditText">Text</td>
        <td class="pl-3">
          <span v-if="!isTextEdit" @click="startEditText">{{todo.text}}</span>
          <div class="input-group" v-if="isTextEdit">
            <input
              type="text"
              class="form-control"
              v-model="newText"
              @keydown.enter="editText(todo.id)"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="editText(todo.id)">
                Ok
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr class="noeditable">
        <td class="pr-3">createdTime</td>
        <td class="pl-3">{{getCreationTime(todo.time.createdTime)}}</td>
      </tr>
      <tr class="editable">
        <td class="pr-3" @click="startEditSort">Sort</td>
        <td class="pl-3">
          <span v-if="!isSortEdit" @click="startEditSort">{{todo.sort}}</span>
          <div class="input-group" v-if="isSortEdit">
            <input
              type="text"
              class="form-control"
              v-model="newSort"
              @keydown.enter="editSort(todo.id)"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="editSort(todo.id)">
                Ok
              </button>
            </div>
          </div>
        </td>
      </tr>
      <tr class="noeditable">
        <td class="pr-3">Status</td>
        <td class="pl-3">{{todo.status}}</td>
      </tr>
      <tr class="noeditable">
        <td class="pr-3">Action</td>
        <td class="pl-3">{{todo.action}}</td>
      </tr>
    </table>
    <!-- remove me!!!!1 -->
    <!-- <pre class="text-left">{{$store.state}}</pre> -->
  </div>
</template>

<script>
// -----libraries:
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormat from 'moment-duration-format';
// eslint-disable-next-line
import momentTimer from 'moment-timer';

// -----other:
import array from '@/library/array';

export default {
  name: 'TrackProperty',
  props: ['todo'],
  data () {
    return {
      newText: this.todo.text,
      newSort: this.todo.sort,
      isTextEdit: false,
      isSortEdit: false,
      selectedCategory: this.todo.categoryId
    };
  },
  methods: {
    getItem (id) {
      return array.getItemInObjArrByID(id, this.$store.state.UserData.todoList.items);
    },
    getCategoryName (id) {
      return this.$store.getters['UserData/getCategoryById'](id)[0].name;
    },
    getCreationTime (ms) {
      return moment(ms).format('DD.MM.YYYY -- HH:mm:ss');
    },
    startEditText () {
      this.isTextEdit = true;
    },
    startEditSort () {
      this.isSortEdit = true;
    },
    editText (id) {
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      this.todo.text = this.newText;
      this.$store.commit('UserData/update', {
        index: index,
        object: item
      });
      this.isTextEdit = false;
    },
    editSort (id) {
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      this.todo.sort = this.newSort;
      this.$store.commit('UserData/update', {
        index: index,
        object: item
      });
      this.isSortEdit = false;
    },
    selectCategory (id) {
      this.selectedCategory = id;
      this.todo.categoryId = this.selectedCategory;
    }
  },
  computed: { },
  components: { }
};
</script>
