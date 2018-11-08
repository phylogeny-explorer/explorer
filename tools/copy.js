import Promise from 'bluebird';
import fs from './lib/fs';

const IS_LOCAL = !process.argv.includes('--release');
const BUILD_DIR = (IS_LOCAL ? 'build' : 'release') + '/client';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await fs.makeDir(BUILD_DIR+'/public');

  await Promise.all([
    ncp('node_modules/bootstrap/dist/css', BUILD_DIR+'/public/css'),
    ncp('node_modules/bootstrap/dist/fonts', BUILD_DIR+'/public/fonts'),
    ncp('client/src/public', BUILD_DIR+'/public')
  ]);
}

export default copy;
