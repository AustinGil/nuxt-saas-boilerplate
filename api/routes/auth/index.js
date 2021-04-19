import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_PHRASE, REFRESH_KEY, AUTH_KEY } from '../../config.js';
import { wrapAsync, auth as authMiddleware } from '../../middleware/index.js';
import { auth } from '../../services/index.js';

const COOKIE_OPTS = {
  maxAge: 360000,
  sameSite: true,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  // domain: '',
};

const router = Router();

router.post(
  '/register',
  wrapAsync(async (request, response) => {
    const { username, email, password, repeatPassword, meta } = request.body;
    const user = await auth.register({
      username,
      email,
      password,
      repeatPassword,
      meta,
    });

    const authToken = jwt.sign({ user: user }, SECRET_PHRASE, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign({ userId: user.id }, SECRET_PHRASE, {
      expiresIn: '7d',
    });

    response.cookie(AUTH_KEY, authToken, COOKIE_OPTS);
    response.cookie(REFRESH_KEY, refreshToken, COOKIE_OPTS);

    return user.toPublic();
  })
);

router.post(
  '/login',
  wrapAsync(async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await auth.login({ email, password });

      const authToken = jwt.sign({ user: user }, SECRET_PHRASE, {
        expiresIn: '30m',
      });
      const refreshToken = jwt.sign({ userId: user.id }, SECRET_PHRASE, {
        expiresIn: '7d',
      });

      response.cookie(AUTH_KEY, authToken, COOKIE_OPTS);
      response.cookie(REFRESH_KEY, refreshToken, COOKIE_OPTS);

      return user.toPublic();
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
);

router.get(
  '/me',
  authMiddleware(),
  wrapAsync(request => {
    const user = request.user;
    return user.toPublic();
  })
);

router.post(
  '/logout',
  wrapAsync(async (request, response) => {
    await Promise.resolve();
    // TODO: remove session in db
    response.clearCookie(AUTH_KEY, COOKIE_OPTS);
    response.clearCookie(REFRESH_KEY, COOKIE_OPTS);
    return true;
  })
);

export default router;
