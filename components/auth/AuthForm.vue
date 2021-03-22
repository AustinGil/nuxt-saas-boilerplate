<template>
  <div>
    <h2>{{ isRegistering ? 'Register' : 'Login' }}</h2>

    <AuthRegister v-if="isRegistering" />
    <AuthLogin v-else />

    <button @click="isRegistering = false">Login</button>
    <button @click="isRegistering = true">Register</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    isRegistering: false,
  }),
};
</script>
