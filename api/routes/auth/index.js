import { Router } from 'express';
import { wrapAsync } from '../../middleware';
import { auth } from '../../services';

const router = Router();

router.post(
  '/register',
  wrapAsync(async request => {
    const { username, email, password, repeatPassword, meta } = request.body;
    const user = await auth.register({
      username,
      email,
      password,
      repeatPassword,
      meta,
    });
    return user;
  })
);

router.post(
  '/login',
  wrapAsync(async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await auth.login({ email, password });

      return user.toPublic();
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
);

export default Router;
