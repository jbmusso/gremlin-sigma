var inherits = require('util').inherits;

var _ = require('underscore');

var Vertex = require('gremlin-core-js/src/structure/vertex');
var VertexProperty = require('gremlin-core-js/src/structure/vertexproperty');
var ElementHelper = require('gremlin-core-js/src/structure/util/ElementHelper');

var SigmaHelper = require('./SigmaHelper');
var SigmaElement = require('./SigmaElement');
var SigmaEdge = require('./SigmaEdge');
var SigmaVertexProperty = require('./SigmaVertexProperty');


function SigmaVertex(node, graph) {
  SigmaElement.call(this, graph);
  this.baseElement = node;
  this.iterators = new SigmaVertex.Iterators(this);
}

inherits(SigmaVertex, SigmaElement);
_.extend(SigmaVertex.prototype, Vertex.prototype);


SigmaVertex.prototype.property = function(key, value, keyValues) {
  var list;
  if (arguments.length === 1) { // todo: improve check?
    return this.getProperty(key);
  } else {
    return this.setProperty(key, value, keyValues);
  }
};

// JS specific method for getting a property (see property method above)
SigmaVertex.prototype.getProperty = function(key) { // JS specific method
  if (_.has(this.baseElement, key)) {
    return this.baseElement[key];
  } else {
    return VertexProperty.empty();
  }
};

// JS specific method for setting a property (see property method above)
SigmaVertex.prototype.setProperty = function(key, value, keyValues) {
  var optionalId = ElementHelper.getIdValue(keyValues);
  ElementHelper.validateProperty(key, value);

  this.baseElement[key] = value;

  return new SigmaVertexProperty(this, key, value);
};

SigmaVertex.prototype.addEdge = function(label, vertex, keyValues) {
  ElementHelper.validateLabel(label);
  ElementHelper.legalPropertyKeyValueArray(keyValues);

  var node = this.baseElement;
  var baseGraph = this.graph.getBaseGraph();
  var sigmaEdge = {
    id: keyValues && keyValues.id || 'e', //todo: improve edge id allocation
    source: this.baseElement.id,
    target: vertex.baseElement.id
  };

  baseGraph.addEdge(sigmaEdge);

  var edge = SigmaEdge(sigmaEdge, this.graph);

  return edge;
};

SigmaVertex.prototype.getIterators = function() {
  return this.iterators;
};


SigmaVertex.Iterators = function SigmaVertexIterators(vertex) {
  this.element = vertex;
};

// inherits(SigmaVertex.Iterators, SigmaElement.Iterators); // extends //todo: add missing SigmaElmeent.Iterators
_.extend(SigmaVertex.Iterators.prototype, Vertex.Iterators.prototype, {
  vertices: function(direction, branchFactor, labels) {
    var vertices = SigmaHelper.getVertices(this.element, direction, branchFactor, labels);

    return vertices;
  }
});



module.exports = SigmaVertex;