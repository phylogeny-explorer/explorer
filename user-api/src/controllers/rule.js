import { Controller } from '../modules';
import AccessControl from '../middleware/AccessControl';
import { Rule } from 'common/databases/admin';

class RuleController extends Controller {

  constructor() {
    super(AccessControl);
  }

  generate(req, res, next) {
    // Rule.remove({}, (err, deleted) => {
    //   let route = [];
    //   const routes = [];
    //
    //   req.app._router.stack.forEach((middleware) => {
    //     if (middleware.route) { // routes registered directly on the app
    //       routes.push(middleware.route);
    //     } else if (middleware.name === 'router') { // router middleware
    //       middleware.handle.stack.forEach((handler) => {
    //         route = handler.route;
    //         route.controller = middleware.handle._controller;
    //         routes.push(route);
    //       });
    //     }
    //   });
    //
    //   for (const r of routes) {
    //     const newRule = new Rule();
    //     newRule.path = r.path;
    //     newRule.method = r.stack[0].method.toUpperCase();
    //     newRule.controller = r.controller;
    //     newRule.action = r.stack[0].name;
    //     newRule.created = Date.now();
    //     newRule.modified = null;
    //     newRule.save();
    //   }
    //
    //   this.handleResponse(res, next, null, 'done');
    // });

    this.handleResponse(res, next, null, 'nothing happened');
  }

  getRules(req, res, next) {
    Rule.find({}, 'path method controller action -_id', (err, rules) => {
      this.handleResponse(res, next, err, rules);
    });
  }
}

export default RuleController;
