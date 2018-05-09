/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 18/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import fs from 'fs';
import mime from 'mime';
import Modules from '../modules';
import AccessControl from '../middleware/AccessControl';
import { S3 } from 'common/aws';

class AssetController extends Modules.Controller {

  constructor() {
    super(AccessControl);
  }

  destroyTempImage(req, res, next) {
    const key = req.body.asset.name;
    S3.destroyTempImage(key, (err, data) => {
      this.handleResponse(res, next, err, { deleted: req.body.asset.name, data });
    });
  }

  destroyCladeImage(req, res, next) {
    const key = req.body.asset.name;
    const id = req.body.asset.id;
    S3.destroyCladeImage(id, key, (err, data) => {
      this.handleResponse(res, next, err, { deleted: req.body.asset.name, data });
    });
  }

  uploadTempImage(req, res, next) {
    const img = req.file;
    if (!img) {
      this.handleResponse(res, next, { error: 'image missing from request' }, {});
    }
    fs.readFile(img.path, (err, imgData) => {
      if (err) {
        console.error(err);
      } else {
        const key = `${img.filename}.${mime.extension(img.mimetype)}`;
        S3.uploadTempImage(key, imgData, (err1, data) => {
          fs.unlink(img.path, (err2) => {
            if (err2) {
              // TODO log in server log
              throw err2;
            }
          });
          this.handleResponse(res, next, err1,
            {
              link: S3.getTempUrl(key),
              folder: 'temp',
              name: key,
              id: img.filename,
              ETag: data.ETag,
            });
        });
      }
    });
  }
}

export default AssetController;
