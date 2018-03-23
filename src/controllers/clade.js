/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 30/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import mongoose from 'mongoose';

import Modules from '../modules';
import Clade from '../models/clade';
import AccessControl from '../middleware/AccessControl';


class CladeController extends Modules.Controller {

  constructor() {
    super(AccessControl);
  }

  getClades(req, res, next) {
    const nodeId = req.params.id || '55ae8ce9343108fa191058d2'; // Root node
    const depth = Number.parseInt(req.params.depth, 10) || 3;
    Clade.findById(nodeId, '-__v', (err, clade) => {
      if (clade) {
        const tree = new Modules.Tree(Clade, clade.toObject(), depth, result =>
          this.handleResponse(res, next, err, result)
        );
        tree.begin();
      } else {
        this.handleResponse(res, next, err, { root: {}, depth, total: CladeController.total });
      }
    });
  }

  getCladeById(req, res, next) {
    const cladeId = req.params.id;
    Clade.findById(cladeId, '-__v', (err, clade) => {
      const finalClade = JSON.parse(JSON.stringify(clade));
      Clade.find({ parent: clade._id }, (err1, children) => {
        finalClade.hasChildren = children.length > 0;
        this.handleResponse(res, next, err, finalClade);
      });
    }).populate('parent');
  }

  enrichClades(req, res, next) {
    const cladeIds = req.body.cladeIds;
    Clade.find({ _id: { $in: cladeIds } }, '-__v', (err, clades) => {
      this.handleResponse(res, next, err, clades);
    });
  }

  searchForClades(req, res, next) {
    const name = req.body.name;
    const self = req.body.self;
    Clade.find({ name: { $regex: `^${name}`, $options: 'i' }, _id: { $ne: self } }, 'name',
      (err, clades) => this.handleResponse(res, next, err, clades));
  }

  generate(req, res, next) {
    const localConn = mongoose.createConnection('mongodb://localhost:27017/phylex-public');
    const connectionString = 'mongodb://35.162.254.17:27017/phylex-public';

    const options = {
      user: 'phylexpublicuser',
      pass: '53010c7ca48711e680f576304dec7eb7',
    };

    const remoteConn = mongoose.createConnection(connectionString, options);
    const localClade = localConn.model('clades', Clade.schema);
    const RemoteClade = remoteConn.model('clades', Clade.schema);

    localClade.find({}, (err, olClades) => {
      for (let i = 0; i < olClades.length; i += 1) {
        const o = olClades[i];
        const clade = new RemoteClade();

        if (o.name !== null) {
          o.name = o.name.trim();
          if (o.name.indexOf('DUPLICATE') >= 0) {
            continue;
          }
          if (o.name.indexOf('Paparia') >= 0) {
            continue;
          }
          if (o.name.indexOf('†') >= 0) {
            o.name = o.name.replace('†', '').trim();
            o.extant = false;
          }
          if (o.name.indexOf('|') >= 0) {
            o.name = null;
          }
        }

        clade._id = o._id;
        clade.parent = o.parent;
        clade.name = o.name || null;
        clade.description = o.description || null;
        clade.otherNames = o.otherNames || null;
        clade.extant = o.extant || null;
        clade.created = Date.now();
        clade.modified = null;
        clade.save((err1, data) => console.error(err1, data.name));
      }
      this.handleResponse(res, next, err, `Finished ${olClades.length} old clades`);
    });
  }
}

export default CladeController;
