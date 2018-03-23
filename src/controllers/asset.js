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
import AwsS3FileManager from '../middleware/AwsS3FileManager';

class AssetController extends Modules.Controller {

  constructor() {
    super(AccessControl);
  }

  destroyTempImage(req, res, next) {
    const key = req.body.asset.name;
    const fileManager = new AwsS3FileManager();
    fileManager.destroyTempImage(key, (err, data) => {
      this.handleResponse(res, next, err, { deleted: req.body.asset.name, data });
    });
  }

  destroyCladeImage(req, res, next) {
    const key = req.body.asset.name;
    const id = req.body.asset.id;
    const fileManager = new AwsS3FileManager();
    fileManager.destroyCladeImage(id, key, (err, data) => {
      this.handleResponse(res, next, err, { deleted: req.body.asset.name, data });
    });
  }

  uploadTempImage(req, res, next) {
    const img = req.file;
    if (!img) {
      this.handleResponse(res, next, { error: 'image missing from request' }, {});
    }
    const fileManager = new AwsS3FileManager();
    fs.readFile(img.path, (err, imgData) => {
      if (err) {
        console.error(err);
      } else {
        const key = `${img.filename}.${mime.extension(img.mimetype)}`;
        fileManager.uploadTempImage(key, imgData, (err1, data) => {
          fs.unlink(img.path, (err2) => {
            if (err2) {
              // TODO log in server log
              throw err2;
            }
          });
          this.handleResponse(res, next, err1,
            {
              link: `https://phylex-public.s3.amazonaws.com/temp/${key}`,
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
