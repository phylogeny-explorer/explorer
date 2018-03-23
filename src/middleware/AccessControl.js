/*!
 * Phylogeny Explorer
 *
 * @summary Action level universal access control
 * @author John Ropas
 * @since 29/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

export default function AccessControl() {
  return (req, res, next, eventName) => {
    //TODO handle access control
    // console.error({
    //   path: req.route.path,
    //   method: req.method,
    //   controller: this.name,
    //   action: eventName,
    // });
  };
}
