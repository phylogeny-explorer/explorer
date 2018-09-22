import fs from 'fs';
import mime from 'mime';
import Promise from 'bluebird';
import { Controller } from '../modules';
import AccessControl from '../middleware/AccessControl';
import { S3 } from 'common/aws';

let readFile = Promise.promisify(fs.readFile);
let unlink = Promise.promisify(fs.unlink);

const ERROR_TEMP  = 'Could not destroy temp image.';
const ERROR_CLADE = 'Could not destroy clade image.';
const ERROR_IMG_MISSING = 'Image missing from request.';
const ERROR_UPLOAD_FAILED = 'Could not upload image.';

class AssetController extends Controller {

  constructor() {
    super(AccessControl);
  }

  destroyTempImage(req, res, next) {
    S3.destroyTempImage(req.body.asset.name)
      .then((response) => this.handleResponse(res, next, null, { deleted: req.body.asset.name, data: response.data }))
      .catch((response) => {
        console.error(response.error);
        this.handleResponse(res, next, { error: ERROR_TEMP });
      });
  }

  destroyCladeImage(req, res, next) {
    S3.destroyCladeImage(req.body.asset.id, req.body.asset.name)
      .then((response) => this.handleResponse(res, next, null, { deleted: req.body.asset.name, data: response.data }))
      .catch((response) => {
        console.error(response.error);
        this.handleResponse(res, next, { error: ERROR_CLADE });
      });
  }

  uploadTempImage(req, res, next) {
    const img = req.file;
    if (!img) return this.handleResponse(res, next, { error: ERROR_IMG_MISSING });
    const key = `${img.filename}.${mime.extension(img.mimetype)}`;

    readFile(img.path)
      .then((data) => S3.uploadTempImage(key, data).then(() => data))
      .then((data) => unlink(img.path).then(() => data))
      .then((data) => this.handleResponse(res, next, null, {
          link: S3.getTempUrl(key),
          folder: 'temp',
          name: key,
          id: img.filename,
          ETag: data.ETag,
        }))
      .catch((err) => {
        console.error(err);
        this.handleResponse(res, next, { error: ERROR_UPLOAD_FAILED });
      })
    ;
  }
}

export default AssetController;
