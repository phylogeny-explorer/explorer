class Tree {

  constructor(schema, root, depth, callback) {
    this._depth = depth;
    this._actualDepth = depth;
    this._root = root;
    this._schema = schema;
    this._callback = callback;
    this._nodes = new Array(depth);
    this._nodeIds = new Array(depth);
    this._total = 1;
    this.fill();
  }

  fill() {
    for (let i = 0; i < this._depth; i += 1) {
      this._nodes[i] = {};
      this._nodeIds[i] = [];
    }
    this._nodes[0][this._root._id] = this._root;
    this._nodeIds[0] = [this._root._id];
  }

  attributeToParent(child, level) {
    const parent = this._nodes[level][child.parent];
    if (parent !== undefined) {
      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(child);
      this._nodes[level + 1][child._id] = child;
      this._nodeIds[level + 1].push(child._id);
      this._total += 1;
    } else {
      console.error(`Couldn't find suitable parent for ${child.name}`);
    }
  }

  traverse(level, nodeIds, callback) {
    if (nodeIds.length > 1000) {
      console.warn('Warning: your are exceeding the safe id count');
    }
    this._schema.find({ parent: { $in: nodeIds } }, null, { sort: 'name' }, (err2, children) => {
      for (let i = 0; i < children.length; i += 1) {
        const child = children[i].toObject();
        child.children = [];
        this.attributeToParent(child, level);
      }
      callback(level + 1);
    });
  }

  walk(level) {
    if (level < this._depth - 1 && this._nodeIds[level].length > 0) {
      this.traverse(level, this._nodeIds[level], (e => this.walk(e)));
    } else {
      if (this._nodeIds[level].length === 0) {
        this._actualDepth = level;
      } else {
        this._actualDepth = level + 1;
      }
      this.reply();
    }
  }

  begin() {
    if (this._depth <= 1) {
      this.reply();
    } else {
      this.walk(0);
    }
  }

  reply() {
    const result = {
      total: this._total,
      depth: this._depth,
      actualDepth: this._actualDepth,
      root: this._root,
    };
    this._callback(result);
  }

  print() {
    let str = '';
    for (let i = 0; i < this._depth; i += 1) {
      str += `Level: ${i + 1}, Count: ${this._nodeIds[i].length} \n`;
      for (const [key, value] of Object.entries(this._nodes[i])) {
        str += `${key}: ${value.name}, `;
      }
      str += `\n`;
    }
    console.error(str);
  }

}

export default Tree;
