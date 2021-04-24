<template>
  <svg class="app-svg" :class="{ 'app-svg--icon': !!icon }" :style="style">
    <use :href="`/img/icons.svg#${fragment}`" />
  </svg>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
export default defineComponent({
  name: 'AppSvg',
  props: {
    name: { type: String, default: '' },
    icon: { type: [Boolean, String], default: '' },
    size: { type: [Number, String], default: '' },
  },

  setup({ name, icon, size }) {
    return {
      fragment: computed(() => name || icon),
      style: computed(() => {
        const styles = {};
        if (size) {
          styles.fontSize = `${Number.parseInt(size / 16)}rem`;
        }
        return styles;
      }),
    };
  },
});
</script>

<style>
.app-svg--icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>
