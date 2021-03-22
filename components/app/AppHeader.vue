<template>
  <header>
    Logo

    <button v-if="user" @click="logout">Logout</button>
  </header>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import auth from '../../store/auth';

export default defineComponent({
  setup() {
    return {
      user: auth.user,
      logout: auth.logout,
    };
  },
});
</script>
