import { reactive, computed } from '@nuxtjs/composition-api';

const authState = reactive({
  user: null,
});

export default {
  get user() {
    return computed(() => authState.user);
  },
  set user(user) {
    authState.user = user;
  },
};
