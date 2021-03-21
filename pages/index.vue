<template>
  <div class="container">
    <div>
      <h1 class="title">
        saas
      </h1>
      <form
        action="/api/auth/register"
        method="POST"
        @submit.prevent="submitForm"
      >
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

      <pre>{{ user }}</pre>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import auth from '../store/auth.js';

// /** @param service */
// async function check(service) {
//   const isLoggedIn = await this.auth.isLoggedIn(service.slug);
//   if (isLoggedIn) {
//     console.log('Already logged in to GitHub');
//   } else {
//     console.log('Not logged in to GitHub.');
//     const r = await this.auth.login(service.slug);
//     console.log(r);
//   }
// }

/**
 * @param {Event} event
 * @returns {Promise<any>}
 */
function submitForm(event) {
  event.preventDefault();

  /** @type {HTMLFormElement} */
  const form = event.target;
  const data = new FormData(form);

  return fetch(form.action, {
    method: form.method,
    body: new URLSearchParams(data),
  }).then(r => r.json());
}

export default defineComponent({
  setup() {
    return {
      user: auth.user,
      // check,
      submitForm,

      async login(event) {
        const user = await submitForm(event);
        if (user) {
          auth.user = user;
        }
      },
    };
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  place-content: center;
}
</style>
