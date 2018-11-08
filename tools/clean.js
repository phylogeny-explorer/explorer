import del from 'del';

const IS_LOCAL = !process.argv.includes('--release');
const BUILD_DIR = IS_LOCAL ? 'build' : 'release';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del(['.tmp', BUILD_DIR+'/*'], { dot: true });
}

export default clean;
