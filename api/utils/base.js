import 'dotenv/config.js';
import { Client } from 'base-api-io';
import { BASEIO_KEY } from '../config.js';

const client = new Client(BASEIO_KEY);

/**
 *
 */
function listUsers() {
  return client.users.list();
}
/**
 * @param id
 */
function deleteUser(id) {
  return client.users.delete(id);
}

(async () => {
  const r = await listUsers();
  // const r = await deleteUser('id)
  console.log(r);
})();
