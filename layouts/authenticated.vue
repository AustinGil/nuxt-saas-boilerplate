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
import auth from '../store/auth';

export default defineComponent({
  setup() {
    return {
      user: auth.user,
    };
  },
});
</script>

<style>
.app-wrapper {
  grid-template-rows: auto 1fr;
}
</style>
