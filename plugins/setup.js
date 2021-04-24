import { onGlobalSetup, useContext, useAsync } from '@nuxtjs/composition-api';
import authState from '../state/auth.js';
import { http } from '../utils';

export default () => {
  onGlobalSetup(() => {
    const context = useContext();
    useAsync(async () => {
      try {
        const response = await http('http://localhost:3000/api/auth/me', {
          headers: context.req.headers,
        });

        authState.user = response.data;
      } catch {
        // console.log(error);
      }
    });
    // provide('globalKey', true);
  });
};
