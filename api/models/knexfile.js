// import { DB_NAME, DB_PASS, DB_USER, DB_HOST } from '../config'
import path from 'path';
import { fileURLToPath } from 'url';
/** @see https://nodejs.org/api/esm.html#esm_no_filename_or_dirname */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const shared = {
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 60000,
  },
  acquireConnectionTimeout: 30000,
};

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite'),
    },
    ...shared,
  },

  // staging: {
  //   client: 'pg',
  //   connection: {
  //     user: DB_USER,
  //     password: DB_PASS,
  //     database: DB_NAME,
  //     host: DB_HOST,
  //     port: 5432
  //   },
  //   ...shared
  // },

  // production: {
  //   client: 'pg',
  //   connection: {
  //     user: DB_USER,
  //     password: DB_PASS,
  //     database: DB_NAME,
  //     host: DB_HOST,
  //     port: 5432
  //   },
  //   ...shared
  // }
};
