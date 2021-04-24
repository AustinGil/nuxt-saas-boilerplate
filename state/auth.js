import { ssrRef, computed } from '@nuxtjs/composition-api';
import { http } from '../utils';

const REFRESH_RATE = 28 * 60 * 1000;

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

/**
 *
 */
export function scheduleRefresh() {
  if (!state.value.user) {
    return;
  }

  const itervalId = setTimeout(async function() {
    try {
      const response = await http('/api/auth/refresh', {
        credentials: 'include',
      });
      state.value.user = response.data;

      scheduleRefresh();
    } catch (error) {
      console.log(error);
      clearTimeout(itervalId);
    }
  }, REFRESH_RATE);
}
