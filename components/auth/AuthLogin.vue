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
import { submitForm } from '../../utils';
import authState from '../../state/auth';

export default defineComponent({
  setup() {
    return {
      async login(event) {
        try {
          const response = await submitForm(event);
          if (response.data) {
            authState.user = response.data;
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
});
</script>
