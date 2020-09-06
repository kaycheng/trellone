<template>
  <div class="list">
    <header>
      <h2 class="header">{{ list.name }}</h2>
      <a href="#" @click="deleteList">
        <i class="far fa-trash-alt"></i>
      </a>
    </header>
    <div class="deck">
      <draggable ghost-class="ghost" group="cards" v-model="cards" @change="cardMoved">
        <Card v-for="card in cards" :card="card" :key="card.id"></Card>
      </draggable>
    
      <div class="input-area">
        <button v-if="!editing" class="button bg-gray-400" @click="newCard">New Card</button>

        <textarea v-if="editing" rows="3" class="content" v-model="content"></textarea>
        <button v-if="editing" class="button bg-green-400" @click="createCard">Create Card</button>
        <button v-if="editing" class="button bg-gray-400" @click="editing = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Rails from "@rails/ujs";
import Card from "components/card";
import draggable from 'vuedraggable';

export default {
  name: "List",
  props: ["list"],
  components: { Card, draggable },
  data: function() {
    return {
      content: '',
      cards: this.list.cards,
      editing: false
    }
  },
  methods: {
    deleteList(event) {
      event.preventDefault();
      if (confirm("Are you sure you want to delete this list?")) {
        this.$store.dispatch("removeList", this.list.id);
      }
    },

    cardMoved(event) {
      let evt = event.moved || event.added;
      if (evt) {
        let el = evt.element;
        let card_id = el.id;

        let data = new FormData();
        data.append("card[list_id]", this.list.id);
        data.append("card[position]", evt.newIndex + 1);

        Rails.ajax({
          url: `/cards/${card_id}/move`,
          type: 'PUT',
          data,
          dataType: 'json',
          success: resp => {
            console.log(resp);
          },
          error: err => {
            console.log(err);
          }
        })
      }
    },

    newCard(event) {
      event.preventDefault();
      this.editing = true;
    },
    createCard(event) {
      event.preventDefault();

      let data = new FormData();
      data.append("card[list_id]", this.list.id);
      data.append("card[name]", this.content);

      Rails.ajax({
        url: "/cards",
        type: "POST",
        data,
        dataType: "json",
        success: resp => {
          this.cards.push(resp);
          this.content = '';
          this.editing = false;
        },
        error: err => {
          console.log(err)
        }
      });
    }
  }
}
</script>  

<style lang="scss" scoped>
.ghost {
  @apply .border-2 .border-gray-400 .border-dashed .bg-gray-200;
}

.list {
  @apply .bg-gray-300 .mx-2 .w-64 .rounded .p-3 .flex-none .h-full;

  &:hover {
    @apply .cursor-pointer;
  }

  .header {
    @apply .font-bold;
  }

  .deck {
    @apply .mt-2;
  }

  .input-area {
    @apply .mt-2;
    .content {
      @apply .w-full .rounded .p-2;

      &:focus {
        @apply .outline-none;
      }
    }

    .button {
      @apply .rounded-sm .px-3 .py-1 .text-sm .font-semibold;

      &:focus {
        @apply .outline-none;
      }
    }
  }
}
header {
  @apply .flex .justify-between .items-center;
}
</style>