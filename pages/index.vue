<template>
  <div>
    <h1 class="title">
      saas
    </h1>

    <pre>{{ user }}</pre>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import authState from '../state/auth';

export default defineComponent({
  layout: 'authenticated',
  setup() {
    return {
      user: authState.user,
    };
  },
});
</script>
