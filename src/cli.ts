#!/usr/bin/env node
import * as fs from 'fs';
import * as log from 'loglevel';
import arg from 'arg';
import { resolveFirebaseJson, resolveNextPagesDir } from './file-resolver';
import { makeDynamicRoutes } from './page-builder';
import {
  appendRules,
  convertToRuleList,
  parseRewriteRuleMap,
} from './rewrites';

const argType = {
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
    const routes = makeDynamicRoutes(pagesDir, ['.js', '.jsx', '.tsx']);
    log.info(`Find ${routes.length} dynamic routings.`);
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseJson, 'utf8'));
    const rewrites = parseRewriteRuleMap(firebaseConfig.hosting.rewrites || []);
    firebaseConfig.hosting.rewrites = convertToRuleList(
      appendRules(rewrites, routes),
    );
    const firebaseConfigText = JSON.stringify(firebaseConfig, null, 2);
    if (!args['--dry-run']) {
      fs.writeFileSync(firebaseJson, firebaseConfigText);
    } else {
      log.info(firebaseConfigText);
    }
    log.info('Finished');
  } catch (err) {
    if (err.code !== 'ARG_UNKNOWN_OPTION') {
      throw err;
    }
    log.error('Invalid arguments!');
  }
};

main();
