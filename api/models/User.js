import * as yup from 'yup';
import Base from './Base.js';

class User extends Base {
  static tableName = 'user';

  static validationSchema = yup.object({
    username: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    verified: yup.boolean().default(false),
    authId: yup.string().required(),
  });

  /** @type { string } */
  username;
  /** @type { string } */
  email;
  /** @type { boolean } */
  verified;
  /** @type { string } */
  authId;

  toPublic() {
    const clone = this.$clone();
    return clone.$omit(['authId', 'deletedAt']);
  }
}

export default User;
