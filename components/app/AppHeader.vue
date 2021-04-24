<template>
  <header>
    Logo

    <button v-if="user" @click="logout">
      Logout
    </button>
  </header>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { http } from '../../utils';
import authState from '../../state/auth.js';

export default defineComponent({
  setup() {
    return {
      user: authState.user,
      logout() {
        const user = authState.user;
        http.post('/api/auth/logout').catch(error => {
          // TODO: notify error
          console.log(error);
          authState.user = user;
        });
        authState.user = null;
      },
    };
  },
});
</script>
