import { rm } from 'fs/promises';
import { join } from 'path';
//import { getConnection } from 'typeorm'; // Deprecated

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {
    // ignore if file does not exist
  }
});

// global.afterEach(async () => {
//   const conn = await getConnection();
//   await conn.close();
// });
