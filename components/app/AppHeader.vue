<template>
  <header>
    Logo

    <button v-if="user" @click="logout">Logout</button>
  </header>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  setup(props, ctx) {
    return {
      user: computed(() => ctx.parent.$store.state.auth.user),
      logout: () => ctx.parent.$store.dispatch('auth/logout'),
    };
  },
});
</script>
