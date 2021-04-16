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

    knex.schema
      .createTable('session', t => {
        t.string('id')
          .primary()
          .unique();
        t.string('user_id')
          .notNullable()
          .references('user.id');
        t.timestamp('expires').notNullable();
        t.string('meta').jsonb();
        t.timestamps(false, true);
      })
      .then(() => console.log('created table: session')),
  ]);
};
/** @param {import('knex')} knex */
export const down = async knex => {
  await Promise.all([
    knex.schema
      .dropTableIfExists('user')
      .then(() => console.log('dropped table: user')),
    knex.schema
      .dropTableIfExists('session')
      .then(() => console.log('dropped table: session')),
  ]);
};
