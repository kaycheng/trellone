<template>
  <div class="container">
    <button v-if="!creatingList" @click="newList" class="new_button">
      <i class="fas fa-plus"></i>Add New List
    </button>
    <input v-if="creatingList" ref="list_name" v-model="list_name" type="text" placeholder="New List Title" class="list_name">
    <button v-if="creatingList" class="button create_button" @click="createList">Create</button>
    <button v-if="creatingList" class="button cancel_button" @click="creatingList = false">Cancel</button>
  </div>
</template>
<script>
export default {
  name: 'Newlist',
  data: function() {
    return {
      creatingList: false,
      list_name: ''
    }
  },
  methods: {
    newList(event) {
      event.preventDefault();
      this.creatingList = true;

      this.$nextTick(() => {
        this.$refs.list_name.focus();
      })
    },
    createList(event) {
      event.preventDefault();
      this.$store.dispatch("createList", this.list_name);
      this.creatingList = false;
      this.list_name = '';
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @apply .bg-gray-300 .px-3 .py-2 .mx-2 .flex-none .h-full .w-64 .rounded;

  .new_button {
    @apply .font-bold .text-left .w-full;

    &:focus {
      @apply .outline-none;
    }
  }

  .list_name {
    @apply .w-full .rounded .px-3 .py-2 .mb-2;

    &:focus {
      @apply .outline-none;
    }
  }

  .button {
    @apply .px-3 .py-1 .rounded .font-bold .text-sm;

    &:focus {
      @apply .outline-none;
    }
  }

  .create_button {
    @apply .bg-green-300;
  }

  .cancel_button {
    @apply .bg-white;
  }
}
</style>