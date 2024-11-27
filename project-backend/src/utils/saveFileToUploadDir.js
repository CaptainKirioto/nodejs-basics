import * as fs from 'node:fs/promises';
import { UPLOAD_DIR } from '../constants/index.js';
import * as path from 'node:path';

export const saveFileToUploadDir = async (file) => {
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newPath);
};