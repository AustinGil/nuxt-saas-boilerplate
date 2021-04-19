<template>
  <div>
    <h1 class="title">
      saas
    </h1>

    <pre>{{ user }}</pre>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  layout: 'authenticated',
  setup(props, ctx) {
    return {
      user: computed(() => ctx.parent.$store.state.auth.user),
    };
  },
});
</script>
