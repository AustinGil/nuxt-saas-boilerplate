<template>
  <header>
    Logo

    <button v-if="user" @click="logout">Logout</button>
  </header>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import authState from '../../state/auth.js';

export default defineComponent({
  setup() {
    return {
      user: authState.user,
      logout: () => (authState.user = null),
    };
  },
});
</script>
