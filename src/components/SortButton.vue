<template>
  <div class="d-inline-block">
    <div class="d-inline-block ml-2" v-if="isEditCategory">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Новая категория"
          @keydown.enter="editCategory"
          v-model="newNameCategory">
        <div class="input-group-append" @click="editCategory">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
        </div>
        <div class="input-group-append" @click="editCategory">
          <span class="input-group-text">
            <font-awesome-icon :icon="['far', 'trash-alt']" />
          </span>
        </div>
      </div>
    </div>
    <button
      v-if="!isEditCategory"
      @click="selectCategory(cat.id)"
      type="button"
      class="btn ml-2"
      :class="{'btn-outline-primary':categorySelected===cat.id, 'btn-outline-secondary':categorySelected!==cat.id, }">
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

export default {
  name: 'SortButton',
  props: ['cat'],
  data () {
    return {
      isEditCategory: false,
      newNameCategory: this.cat.name
    };
  },
  methods: {
    selectCategory (categoryId) {
      if(categoryId !== this.$store.state.todoList.selectedCategory){
        this.$store.commit("setCategory", categoryId);
        this.$emit('sort', categoryId);
        this.isEditCategory = false;
      }else{
        this.isEditCategory = true;
      }
    },
    editCategory () {
      console.log("hihi");
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
