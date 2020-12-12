import * as fs from 'fs';
import * as path from 'path';

export const resolvePath = (src: string): string => {
  // Build fullpath
  let filepath: string;
  if (src === path.resolve(src)) {
    filepath = src;
  } else {
    filepath = path.resolve(process.cwd(), src);
  }
  return filepath;
};

export const resolveFirebaseJson = (src?: string): string => {
  const filePath = src
    ? resolvePath(src)
    : path.resolve(process.cwd(), 'firebase.json');
  // Verify stat
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      throw new Error(`${filePath} is not file.`);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`${filePath} is not exists.`);
    }
    throw err;
  }
  return filePath;
};

export const resolveNextPagesDir = (src?: string): string => {
  const dirPath = src ? resolvePath(src) : path.resolve(process.cwd(), 'pages');
  // Verify stat
  try {
    const stat = fs.statSync(dirPath);
    if (!stat.isDirectory()) {
      throw new Error(`${dirPath} is not directory.`);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`${dirPath} is not exists.`);
    }
    throw err;
  }
  return dirPath;
};
