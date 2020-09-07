require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import "scripts"
import "styles"

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Vue from 'vue/dist/vue.esm';
import Rails from "@rails/ujs";
import draggable from 'vuedraggable';
import store from 'stores/list';
import { mapGetters, mapActions } from 'vuex';
import List from 'components/list';
import Newlist from 'components/newlist';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector("#board");

  if (el) {
    window.$store = store;
    new Vue({
      el,
      store,
      computed: {
        // ...mapGetters(["lists"])
        lists: {
          get() {
            return this.$store.state.lists;
          },
          set(value) {
            this.$store.commit('UPDATE_LISTS', value);
          }
        }
      },
      components: { List, Newlist, draggable },
      methods: {
        ...mapActions(["loadList", "moveList"]),
      },
      beforeMount(){
        this.loadList();
      }
    })
  }
})