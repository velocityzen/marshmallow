'use strict';
let Tree = function() {
  this.db = null;
};

Tree.prototype.scheme = {
  tree: {
    table: 'trees',
    indexes: [ 'slug' ]
  }
};

Tree.prototype.unitInit = function(units) {
  this.db = units.require('db');
  this.table = this.scheme.tree.table;
};

Tree.prototype.get = function(id) {
  return this.db.get(this.table, id);
};

Tree.prototype.getBySlug = function(slug) {
  return this.db.getSlug(this.table, slug);
};

Tree.prototype.create = function(tree) {
  return this.db.insert(this.table, tree);
};

Tree.prototype.update = function(id, to) {
  return this.db.update(this.table, id, to);
};

Tree.prototype.delete = function(id) {
  return this.db.delete(this.table, id);
};

Tree.prototype.addItem = function(id, path, item) {
  let db = this.db;
  path = path.split('/');
  let itemId = path.pop();

  let q = db.table(this.table).get(id);

  q = db.updateOnPath(q, path, (row) => {
    return {
      order: row('order').prepend(itemId),
      items: row('items').merge({
        [itemId]: item
      })
    };
  });

  return q.run();
};

Tree.prototype.updateItem = function(id, path, to) {
  let db = this.db;
  path = db.getPath(path, 'items');

  let q = db.table(this.table).get(id);

  q = db.updateOnPath(q, path, function() {
    return to;
  });

  return q.run();
};

Tree.prototype.renameItem = function(id, path, newName) {
  let db = this.db;
  path = db.getPath(path, 'items');
  let itemId = path.pop();

  let q = db.table(this.table).get(id);

  q = db.updateOnPath(q, path, function(row) {
    let index = row('order').indexesOf(itemId).nth(0);
    let itemMerge = { [newName]: row('items')(itemId) };
    return {
      items: db.r.literal( row('items').merge(itemMerge).without(itemId) ),
      order: row('order').changeAt(index, newName)
    };
  });

  return q.run();
};

Tree.prototype.removeItem = function(item) {
  let db = this.db;
  let path = this.db.getPath(item, 'items');
  let treeId = path.shift();
  let itemId = path.pop();

  let q = db.table(this.table).getAll(treeId, { index: 'slug' });

  q = db.updateOnPath(q, path, function(row) {
    return {
      items: db.r.literal( row('items').without(itemId) ),
      order: row('order').setDifference([ itemId ])
    };
  });

  return q.run();
};


module.exports = Tree;
