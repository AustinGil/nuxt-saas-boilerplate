// import { reactive, computed } from '@nuxtjs/composition-api';

// const authState = reactive({
//   user: null,
// });

// export const reactiveState = reactive({
//   user: null,
// });

// export const reactiveState = {
//   get user() {
//     // return authState.user;
//     return computed(() => authState.user);
//   },
//   set user(user) {
//     authState.user = user;
//   },
// };

// export const state = () => ({
//   get user() {
//     return computed(() => authState.user);
//     // return authState.user;
//   },
//   set user(user) {
//     authState.user = user;
//   },
// });

// export const state = () =>
//   reactive({
//     user: null,
//   });
export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

export const actions = {
  logout(store) {
    store.commit('setUser', null);
  },
};
