<template>
<div class="d-inline-block">
  <div class="d-inline-block mr-2" v-if="isEditCategory">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Новая категория" @keydown.enter="editCategory(cat.id)" v-model="newNameCategory" v-focus>
      <div class="input-group-append" @click="editCategory(cat.id)">
        <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
      </div>
      <div class="input-group-append" v-if="cat.id !== 0" @click="removeCategory(cat.id)">
        <span class="input-group-text">
            <font-awesome-icon :icon="['far', 'trash-alt']" />
          </span>
      </div>
    </div>
  </div>
  <button v-if="!isEditCategory" @click="selectCategory(cat.id)" type="button" class="btn mr-2" :class="{'btn-outline-primary':categorySelected===cat.id, 'btn-outline-secondary':categorySelected!==cat.id}">
      {{cat.name}}
    </button>
</div>
</template>

<script>
// -----fontAwesome:
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

// -----other:
import array from '@/components/lib/array';

export default {
  name: 'SortButton',
  props: ['cat'],
  data () {
    return {
      isEditCategory: false,
      newNameCategory: this.cat.name
    };
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus();
        el.select();
      }
    }
  },
  methods: {
    getItem (id) {
      return array.getItemInObjArrByID(id, this.$store.state.todoList.categories);
    },
    selectCategory (categoryId) {
      if (categoryId !== this.$store.state.todoList.selectedCategory) {
        this.$store.commit('setCategory', categoryId);
        this.$emit('sort', categoryId);
        this.isEditCategory = false;
      } else {
        this.isEditCategory = true;
      }
    },
    editCategory (id) {
      let object = this.getItem(id);
      let index = object.index;
      let item = object.object;
      const trimmedText = this.newNameCategory.trim();
      if (trimmedText && trimmedText !== '') {
        item.name = trimmedText;
        this.$store.commit('updateCategory', {
          index: index,
          object: item
        });
      }
      this.newNameCategory = this.cat.name;
      this.isEditCategory = false;
    },
    removeCategory (id) {
      if (id !== 0) {
        this.$store.commit('deleteCategory', {
          index: this.getItem(id).index,
          id: id
        });
      } else {
        this.isEditCategory = false;
      }
    }
  },
  computed: {
    categorySelected () {
      return this.$store.state.todoList.selectedCategory;
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
