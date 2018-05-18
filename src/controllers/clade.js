import { Tree, Controller } from '../modules';
import { Clade } from 'common/databases/public';
import AccessControl from '../middleware/AccessControl';

class CladeController extends Controller {

  constructor() {
    super(AccessControl);
  }

  getClades(req, res, next) {
    const nodeId = req.params.id || '55ae8ce9343108fa191058d2'; // Root node
    const depth = Math.min(Number.parseInt(req.params.depth, 10) || 3, 6);
    Clade.findById(nodeId, '-__v', (err, clade) => {
      if (clade) {
        const tree = new Tree(Clade, clade.toObject(), depth, result =>
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
}

export default CladeController;
