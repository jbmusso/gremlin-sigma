var inherits = require('util').inherits;

var _ = require('underscore');

var ElementHelper = require('gremlin-core-js/src/structure/util/ElementHelper');
var GraphKey = require('gremlin-core-js/src/structure/Graph.Key');

var SigmaElement = require('./SigmaElement');
// var SigmaHelper = require('./SigmaHelper');


function SigmaVertexProperty(vertex, key, value, propertyKeyValues) {
  var id = null;
  // var id = SigmaHelper.getNextId(vertex.graph);
  SigmaElement.call(this, id, key, vertex.graph);
  this.vertex = vertex;
  this.key = key;
  this.value = value;
  ElementHelper.legalPropertyKeyValueArray(propertyKeyValues);
  ElementHelper.attachProperties(this, propertyKeyValues);
  //TODO: check if objectid is passed as first parameter
}

inherits(SigmaVertexProperty, SigmaElement);
_.extend(SigmaVertexProperty.prototype, SigmaElement.prototype);


module.exports = SigmaVertexProperty;