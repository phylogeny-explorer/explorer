import Promise from 'bluebird';
import fs from './lib/fs';
import pkg from '../package.json';

const IS_LOCAL = !process.argv.includes('--release');
const BUILD_DIR = IS_LOCAL ? 'build' : 'release';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('node_modules/bootstrap/dist/css', BUILD_DIR+'/public/css'),
    ncp('node_modules/bootstrap/dist/fonts', BUILD_DIR+'/public/fonts'),
    ncp('client/src/public', BUILD_DIR+'/public'),
  ]);

  await fs.writeFile('./'+BUILD_DIR+'/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'pm2 start ecosystem.config.js',
    },
  }, null, 2));
}

export default copy;
