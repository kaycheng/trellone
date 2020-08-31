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
import List from 'components/list';

document.addEventListener("turbolinks:load", function(event) {
  let el = document.querySelector("#board");

  if (el) {
    new Vue({
      el,
      data: {
        lists: JSON.parse(el.dataset.lists)
      },
      components: { List }
    })
  }
})