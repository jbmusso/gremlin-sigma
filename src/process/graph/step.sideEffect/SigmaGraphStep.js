var inherits = require('util').inherits;

require('es6-shim');
var _ = require('lazy.js');

var GraphStep = require('gremlin-core-js/src/process/step/sideEffect/graphstep');
var Vertex = require('gremlin-core-js/src/structure/vertex');
var Edge = require('gremlin-core-js/src/structure/edge');
var HasContainer = require('gremlin-core-js/src/structure/util/HasContainer');

var SigmaHelper = require('../../../structure/SigmaHelper');
var SigmaVertex = require('../../../structure/SigmaVertex');


function SigmaGraphStep(traversal, returnClass, graph) {
  this.hasContainers = [];
  GraphStep.call(this, traversal, returnClass);
  this.graph = graph;
}

inherits(SigmaGraphStep, GraphStep);

SigmaGraphStep.prototype.generateTraverserIterator = function(trackPaths) {
  if (this.returnClass === Vertex) { //todo: improve check?
    this.start = this.vertices();
  } else {
    this.start = this.edges();
  }

  GraphStep.prototype.generateTraverserIterator.call(this, trackPaths);
};

SigmaGraphStep.prototype.edges = function() {
  throw new Error('Not yet implemented');
};

SigmaGraphStep.prototype.vertices = function() {
  //todo: add the ability to filter
  return this.getAllVertices();
};

SigmaGraphStep.prototype.getAllVertices = function() {
  var graph = this.graph;

  var iterator = this.graph.getBaseGraph().nodes()
    .map(function(node) { //todo: do this lazily
      return new SigmaVertex(node, graph);
    })
    .values();

  return iterator;
};


module.exports = SigmaGraphStep;