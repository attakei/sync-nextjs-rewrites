#!/usr/bin/env node
import * as log from 'loglevel';
import arg from 'arg';

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
  } catch (err) {
    if (err.code !== 'ARG_UNKNOWN_OPTION') {
      throw err;
    }
    log.error('Invalid arguments!');
  }
};

main();
