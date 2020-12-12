#!/usr/bin/env node
import * as path from 'path';
import * as log from 'loglevel';
import arg from 'arg';
import { resolveFirebaseJson, resolveNextPagesDir } from './arg-resolvers';

const argType = {
  '--help': Boolean,
  '--verbose': Boolean,
  '--firebase': String,
  '--pages': String,
  '--dry-run': Boolean,
};

const main = () => {
  try {
    const args = arg(argType);
    log.setLevel(args['--verbose'] ? 'debug' : 'info');
    log.debug(args);
    const firebaseJson = resolveFirebaseJson(args['--firebase']);
    log.info(`Use firebase configuration: ${firebaseJson}`);
    const pagesDir = resolveNextPagesDir(args['--pages']);
    log.info(`Use next.js pages: ${pagesDir}`);
  } catch (err) {
    if (err.code !== 'ARG_UNKNOWN_OPTION') {
      throw err;
    }
    log.error('Invalid arguments!');
  }
};

main();
