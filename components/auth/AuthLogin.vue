<template>
  <form action="/api/auth/login" method="POST" @submit="login">
    <div class="p-4">
      <label for="email">Email:</label>
      <input id="email" name="email" type="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" name="password" type="password" required />
    </div>
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import auth from '../../store/auth.js';
import { submitForm } from '../../utils';

export default defineComponent({
  setup() {
    return {
      async login(event) {
        const user = await submitForm(event).then(r => r.json());
        if (user) {
          auth.user = user;
        }
      },
    };
  },
});
</script>
