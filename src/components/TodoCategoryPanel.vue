<template>
<div class="row trace-">
  <div class="col-sm-12 text-left mb-3">
    <sort-button
      v-for="item in categories"
      v-bind:cat="item"
      v-bind:key="item.id"
      @sort="sortByCategory">
    </sort-button>
    <div class="d-inline-block mr-2">
      <div class="input-group" v-if="isShowNewCategory">
        <input
          type="text"
          class="form-control"
          placeholder="Новая категория"
          @keydown.enter="createNewCategory"
          v-model="nameNewCategory"
          v-focus>
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

// -----vue components:
import SortButton from '@/components/SortButton';

export default {
  name: 'TodoCategoryPanel',
  data () {
    return {
      categories: [],
      nameNewCategory: '',
      isShowNewCategory: false

    };
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus();
      }
    }
  },
  created () {
    this.categories = this.$store.state.todoList.categories;
  },
  methods: {
    sortByCategory (categoryId) {
      this.$emit('sort', categoryId);
    },
    showNewCategory () {
      this.isShowNewCategory = true;
    },
    createNewCategory () {
      const trimmedText = this.nameNewCategory.trim();
      if (trimmedText && trimmedText !== '') {
        this.$store.commit('addCategory', {
          id: ++this.$store.state.todoList.lastCountCategory,
          name: trimmedText
        });
      }
      this.$store.state.todoList.selectedCategory = this.$store.state.todoList.lastCountCategory;
      this.$emit('sort', this.$store.state.todoList.lastCountCategory);
      this.nameNewCategory = '';
      this.isShowNewCategory = false;
    }
  },
  computed: { },
  components: {
    FontAwesomeIcon,
    faSolid,
    faRegular,
    brands,
    SortButton
  }
};
</script>
