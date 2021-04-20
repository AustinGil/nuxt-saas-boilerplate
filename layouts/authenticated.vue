<template>
  <div class="app-wrapper grid min-block-full">
    <AppHeader />

    <div class="container">
      <AuthForm v-if="!user" />
      <Nuxt v-else />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import authState from '../state/auth';

export default defineComponent({
  setup() {
    return {
      user: authState.user,
      logout: () => (authState.user = null),
    };
  },
});
</script>

<style>
.app-wrapper {
  grid-template-rows: auto 1fr;
}
</style>
