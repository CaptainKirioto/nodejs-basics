import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExist(TEMP_UPLOAD_DIR);
  await createDirIfNotExist(UPLOAD_DIR);
  startServer();
};

bootstrap();

//zcKOJqTIrNq2gLNV Margo
