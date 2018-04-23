<template>
<div class="row trace-">
  <div class="col-sm-12 text-left mb-3">
    <button
      v-for="cat in categories"
      v-bind:key="cat.id"
      type="button"
      class="btn ml-2"
      :class="{'btn-outline-primary':categorySelected, 'btn-outline-secondary':!categorySelected, }">
      {{cat.name}}
    </button>
    <div class="d-inline-block ml-2">
      <div class="input-group" v-if="isShowNewCategory">
        <input
          type="text"
          class="form-control"
          placeholder="Новая категория"
          @keydown.enter="createNewCategory"
          v-model="nameNewCategory">
        <div class="input-group-append" @click="createNewCategory">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </span>
        </div>
      </div>
      <button type="button" class="btn btn-outline-secondary" v-if="!isShowNewCategory" @click="showNewCategory">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </div>
  </div>
</div>
</template>

<script>
// -----styles:
import '../assets/less/components/todo-item.less';
import '../assets/less/fade.less';

// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

export default {
  name: 'TodoSortPanel',
  data () {
    return {
      categories: [],
      nameNewCategory: '',
      isShowNewCategory: false
    };
  },
  created () {
    this.categories = this.$store.state.todoList.categories;
  },
  methods: {
    showNewCategory () {
      this.isShowNewCategory = true;
    },
    createNewCategory () {
      const trimmedText = this.nameNewCategory.trim();
      if (trimmedText && trimmedText !== '') {
        this.$store.commit("addCategory", {
            id: ++this.$store.state.todoList.lastCountCategory,
            name: trimmedText,
            color: '#cccccc',
            elements: [],
            selected: false
        });
      }
      this.nameNewCategory = '';
      this.isShowNewCategory = false;
    }
  },
  computed: {
    categorySelected () {
      return true;
    }
  },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands
  }
};
</script>
