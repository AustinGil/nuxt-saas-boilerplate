<template>
  <form action="/api/auth/register" method="POST" @submit="register">
    <div>
      <label for="username">Username:</label>
      <input id="username" name="username" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" name="email" type="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" name="password" type="password" required />
    </div>
    <div>
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        required
      />
    </div>
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { submitForm } from '../../utils';

export default defineComponent({
  setup(props, ctx) {
    return {
      async register(event) {
        const response = await submitForm(event);
        if (response.data) {
          ctx.parent.$store.commit('auth/setUser', response.data);
        }
      },
    };
  },
});
</script>
