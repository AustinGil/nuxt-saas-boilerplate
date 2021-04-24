import * as yup from 'yup';
import { Client } from 'base-api-io';
import { BASEIO_KEY } from '../config.js';
import { User } from '../models';
import { ConflictError, AuthorizationError, NotFoundError } from '../utils';

const client = new Client(BASEIO_KEY);

/**
 * @typedef {{
 * id: string
 * email: string
 * custom_data: Record<string, any>
 * }} BaseUser
 */

/**
 * @param {{
 * username: string
 * email: string
 * password: string
 * repeatPassword: string
 * meta: Record<string, any>
 * }} args
 * @returns {Promise<import('../models').User>}
 */
export async function register(args) {
  try {
    const schema = yup.object({
      username: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(8)
        .required(),
      repeatPassword: yup
        .string()
        .matches(args.password, 'Passwords do not match')
        .required(),
      meta: yup.object(),
    });

    const {
      username,
      email,
      password,
      repeatPassword,
      meta,
    } = schema.validateSync(args, {
      abortEarly: false,
    });

    const existingUsers = await User.query()
      .where({ email })
      .orWhere({ username });

    if (existingUsers.length) {
      console.log(existingUsers);
      throw new ConflictError('User with that username/email already exists');
    }

    const baseUser = await client.users.create(
      email,
      password,
      repeatPassword,
      meta
    );

    const newUser = await User.query().insert({
      username,
      email,
      authId: baseUser.id,
    });

    return newUser;
  } catch (error) {
    if (error?.data?.error === 'EMAIL_IS_ALREADY_REGISTERED') {
      throw new ConflictError('Email already registered');
    }
    throw error;
  }
}

/**
 * @param {{
 * email: string
 * password: string
 * }} args
 * @returns {Promise<import('../models').User>}
 */
export async function login(args) {
  try {
    const schema = yup.object({
      email: yup
        .string()
        .email()
        .required(),
      password: yup.string().required(),
    });

    const { email, password } = schema.validateSync(args, {
      abortEarly: false,
    });

    const [user] = await Promise.all([
      User.query()
        .where({ email })
        .first(),
      client.sessions.authenticate(email, password),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  } catch (error) {
    if (error?.data?.error === 'INVALID_CREDENTIALS') {
      throw new AuthorizationError('Bad username and/or password');
    }
    throw error;
  }
}

// /** @param {string} email */
// export async function startResetPassword(email) {
//   const token = await client.passwords.forgotPassword(email);
// }

// /**
//  * @param {{
//  * password: string
//  * repeatPassword: string
//  * resetToken: string
//  * }} params
//  * @returns {Promise<{ id: string, email: string }>}
//  */
// export async function completeResetPassword({
//   password,
//   repeatPassword,
//   resetToken,
// }) {
//   // token = await client.passwords.forgotPassword(email)
// }

export default {
  register,
  login,
};
