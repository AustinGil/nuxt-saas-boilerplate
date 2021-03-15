/** @param {import('knex')} knex */
export const up = async knex => {
  await Promise.all([
    knex.schema
      .createTable('user', t => {
        t.string('id')
          .primary()
          .unique();
        t.string('auth_id')
          .notNullable()
          .unique();
        t.string('username')
          .notNullable()
          .unique();
        t.string('email')
          .notNullable()
          .unique();
        t.boolean('verified').default(false);
        t.timestamps(false, true);
        t.timestamp('deleted_at');
      })
      .then(() => console.log('created table: user')),
  ]);
};
/** @param {import('knex')} knex */
export const down = async knex => {
  await knex.schema
    .dropTableIfExists('user')
    .then(() => console.log('dropped table: user'));
};
