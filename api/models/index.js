import { Model } from 'objection';
import knex from './knex.js';
Model.knex(knex);

export { default as User } from './User.js';
