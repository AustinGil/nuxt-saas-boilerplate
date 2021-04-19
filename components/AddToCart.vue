<template>
  <button
    class="snipcart-add-item"
    :data-item-id="id"
    :data-item-price="price"
    :data-item-url="url"
    :data-item-description="description"
    :data-item-image="image"
    :data-item-name="name"
  >
    <slot>Add to cart</slot>
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: [String, Number],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
});
</script>
