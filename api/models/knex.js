// import pg from 'pg'
import knex from 'knex';
import knexConfig from './knexfile.js';
const config = knexConfig[process.env.NODE_ENV || 'development'];

// Returns int columns from DB as int types instead of strings
// pg.types.setTypeParser(20, 'text', parseInt)

const db = knex(config);
export default db;
