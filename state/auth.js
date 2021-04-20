import { ssrRef, computed } from '@nuxtjs/composition-api';

const state = ssrRef({
  user: null,
});

export default {
  get user() {
    return computed(() => state.value.user);
  },
  set user(user) {
    state.value.user = user;
  },
};
