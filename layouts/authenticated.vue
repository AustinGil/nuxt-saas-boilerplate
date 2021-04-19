<template>
  <div class="app-wrapper grid min-block-full">
    <AppHeader />

    <div class="container">
      <AuthForm v-if="!user" />
      <Nuxt v-else />
    </div>

    <!-- <div
      id="snipcart"
      data-config-modal-style="side"
      data-api-key="NWYzZWFhMmEtOGE3Ny00NDRhLWFjNjQtYmJiOTNkNmFkYzBhNjM3NTIzOTY4MTE0MzE1NTk2"
      hidden
    ></div> -->
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  setup(props, ctx) {
    return {
      user: computed(() => ctx.parent.$store.state.auth.user),
      logout: () => ctx.parent.$store.commit('auth/setUser', null),
    };
  },
});
</script>

<style>
.app-wrapper {
  grid-template-rows: auto 1fr;
}
</style>
