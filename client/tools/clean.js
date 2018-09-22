/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import del from 'del';
import fs from './lib/fs';

const IS_LOCAL = !process.argv.includes('--release');
const BUILD_DIR = IS_LOCAL ? 'build' : 'release';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del(['.tmp', BUILD_DIR+'/*', '!'+BUILD_DIR+'/.git'], { dot: true });
  await fs.makeDir(BUILD_DIR+'/public');
}

export default clean;
