import { http } from '../utils/index.js';

export const actions = {
  async nuxtServerInit(store, { req }) {
    try {
      const response = await http('http://localhost:3000/api/auth/me', {
        headers: req.headers,
      });
      store.commit('auth/setUser', response.data);

      // store.state.auth.user = response.data;
    } catch {
      // console.log(error);
    }
  },
};
