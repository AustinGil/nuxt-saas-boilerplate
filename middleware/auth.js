// import * as auth from '../store/auth.js';
// import { http } from '../utils/index.js';

// /**
//  * @param {{ store: any, redirect: any }} options
//  */
// export default async function ({ store, redirect }) {
//   try {
//     const response = await http('http://localhost:3000/api/auth/me', {
//       credentials: 'include',
//     });
//     console.log(response.data);
//     auth.user = response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
