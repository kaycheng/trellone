<template>
  <div>
    <div class="card" @click="editing = true">
      {{ card.name }}
    </div>

    <div class="dialog" v-if="editing">
      <div class="inner">
        <a href="#" class="closeButton" @click="close">
          <i class="fa fa-times"></i>
        </a>
        <textarea class="content" v-model="card_name"></textarea>
        <button class="updateButton" @click="update">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: "Card",
  props: ["card"],
  data: function() {
    return {
      editing: false,
      card_name: this.card.name
    }
  },
  methods: {
    // ...mapActions(["updateCard"]),
    close(event) {
      event.preventDefault();
      this.editing = false;
    },
    update(event) {
      event.preventDefault();
      this.$store.dispatch("updateCard", { id: this.card.id, name: this.card_name });
      this.editing = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply .bg-gray-100 .mb-2 .rounded-sm .px-2 .py-2;
}

.dialog {
  background-color: rgba(0, 0, 0, 0.7);
  @apply .fixed .w-full .h-full .top-0 .left-0 .flex .items-center .justify-center;

  

  .inner {
    @apply .bg-white .flex .flex-col .px-6 .py-2;
    width: 700px;
    
    .closeButton {
      @apply .text-gray-800 .text-right;
    }
    .content {
      @apply .p-2 .border .border-gray-300 .mt-2;

      &:focus {
        @apply .outline-none;
      }
    }

    .updateButton {
      @apply .bg-gray-400 .mt-2 .px-3 .py-2 .rounded;
      &:focus {
        @apply .outline-none;
      }
    }
  }
}
</style>