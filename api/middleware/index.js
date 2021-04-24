import jwt from 'jsonwebtoken';
import { SECRET_PHRASE, REFRESH_KEY } from '../config.js';
import { User } from '../models';

/**
 * @typedef {import('express').Handler} Handler
 */

/**
 * @param {Function} fn async handler
 * @returns {Handler} Express Handler with safety
 */
export function wrapAsync(fn) {
  const handler = (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then(data => {
        if (res.headersSent) {
          return;
        }

        if (typeof data === 'object') {
          res.json(data);
        } else {
          res.send(data);
        }
      })
      .catch(next);
  };
  return handler;
}

/**
 * @param {{ loggedIn: boolean }} [options={ loggedIn: true }]
 * @returns {Handler}
 */
export const auth = (options = { loggedIn: true }) =>
  wrapAsync(async (request, response, next) => {
    try {
      const refreshToken = request.cookies[REFRESH_KEY];

      if (!refreshToken) {
        if (options.loggedIn) {
          throw new Error('Not logged in'); // TODO: create auth error
        } else {
          next();
        }
      }

      const { userId } = jwt.verify(refreshToken, SECRET_PHRASE);

      const user = await User.query()
        .where({ id: userId })
        .first();

      if (options.loggedIn && !user) {
        throw new Error('Not logged in'); // TODO: create auth error
      }

      request.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });
