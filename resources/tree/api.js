'use strict';
const mmhandler = require('mmp-errors').handler;
const types = require('../types');

let Api = function() {
  this.ctrl = undefined;
};

Api.prototype.unitInit = function(units) {
  this.ctrl = units.require('controller');
};

Api.prototype.calls = [
  'get', 'getBySlug', 'create', 'update', 'delete',
  'addItem', 'updateItem', 'deleteItem'
];

Api.prototype.getSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: 'optional'
    },
    title: 'Tree',
    description: 'Returns a tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }
};

Api.prototype.get = function(auth, data, cb) {
  this.ctrl
    .get(data.id)
    .asCallback(mmhandler('NotFound', cb));
};

Api.prototype.getBySlugSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: 'optional'
    },
    title: 'Tree',
    description: 'Returns a tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'slug' ],
      properties: {
        slug: types.slug()
      }
    }
  }
};

Api.prototype.getBySlug = function(auth, data, cb) {
  this.ctrl
    .getBySlug(data.slug)
    .asCallback(mmhandler('NotFound', cb));
};

Api.prototype.createSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree',
    description: 'Creates a tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'slug', 'order', 'items' ],
      properties: {
        slug: types.slug(),
        order: {
          type: 'array',
          items: types.slug()
        },
        items: {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            [ types.slugPattern ]: types.item()
          }
        }
      }
    }
  }
};

Api.prototype.create = function(auth, data, cb) {
  this.ctrl
    .create(data)
    .asCallback(mmhandler('BadRequest', cb));
};

Api.prototype.updateSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree',
    description: 'Updates tree\'s properties',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id', 'to' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },

        to: {
          type: 'object',
          additionalProperties: false,
          properties: {
            slug: types.slug(),
            order: {
              type: 'array',
              items: types.slug()
            }
          }
        }
      }
    }
  }
};

Api.prototype.update = function(auth, data, cb) {
  this.ctrl
    .update(data.id, data.to)
    .asCallback(mmhandler('BadRequest', cb));
};

Api.prototype.deleteSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree',
    description: 'Deletes a tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }
};

Api.prototype.delete = function(auth, data, cb) {
  this.ctrl
    .delete(data.id)
    .asCallback(mmhandler('NotFound', cb))
};

Api.prototype.addItemSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree\'s item',
    description: 'Adds an item to the tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id', 'path', 'item' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        path: types.path(),
        item: types.item()
      }
    }
  }
};

Api.prototype.addItem = function(auth, data, cb) {
  this.ctrl
    .addItem(data.id, data.path, data.item)
    .asCallback(mmhandler('BadRequest', cb));
};

Api.prototype.updateItemSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree\'s item',
    description: 'Updates item properties',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id', 'path', 'to' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        path: types.path(),
        to: {
          type: 'object',
          additionalProperties: false,
          properties: {
            title: types.title(),
            slug: types.slug(),
            href: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};

Api.prototype.updateItem = function(auth, data, cb) {
  let q = data.to.slug ?
    this.ctrl.renameItem(data.id, data.path, data.to.slug) :
    this.ctrl.updateItem(data.id, data.path, data.to)

  q.asCallback(mmhandler('BadRequest', cb));
};

Api.prototype.deleteItemSchema = function() {
  return {
    auth: {
      provider: 'user',
      required: true
    },
    title: 'Tree\'s item',
    description: 'Deletes item from the tree',
    request: {
      type: 'object',
      additionalProperties: false,
      required: [ 'id', 'path' ],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },

        path: {
          type: 'string',
          format: 'uuid'
        }
      }
    }
  }
};

Api.prototype.deleteItem = function(auth, data, cb) {
  this.ctrl
    .deleteItem(data.id, data.path)
    .asCallback(mmhandler('NotFound', cb))
};


module.exports = Api;

