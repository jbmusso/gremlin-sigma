var inherits = require('util').inherits;

var _ = require('underscore');

var Graph = require('gremlin-core-js/src/structure/graph');
var Vertex = require('gremlin-core-js/src/structure/vertex');
var ElementHelper = require('gremlin-core-js/src/structure/util/elementhelper');

// var SigmaHelper = require('./SigmaHelper');

var SigmaVertex = require('./SigmaVertex');

var SigmaGraphTraversal = require('../process/graph/SigmaGraphTraversal');


function SigmaGraph(sigmaGraph) {
  this.sigmaGraph = sigmaGraph;
  this.currentId = 0;
}

inherits(SigmaGraph, Graph);

SigmaGraph.open = function(sigmaGraph) {
  return new SigmaGraph(sigmaGraph);
};


SigmaGraph.prototype.addVertex = function(keyValues) {
  keyValues = arguments.length === 1 ? keyValues : [].slice.call(arguments);
  ElementHelper.legalPropertyKeyValueArray(keyValues);

  var idValue = ElementHelper.getIdValue(keyValues) || null;
  var label = ElementHelper.getLabelValue(keyValues) || Vertex.DEFAULT_LABEL;

  if (idValue) {
    if (this.vertices.get(idValue)) {
      throw new Error('Exceptions.vertexWithIdAlreadyExists('+idValue);
    }
  } else {
      // idValue = SigmaHelper.getNextId(this);
      // idValue = this.currentId++;
  }

  // console.log(keyValues);
  // _.defaults(keyValues || {}, {
  //   id: 'n'+ this.currentId++
  // });

  // console.log(keyValues);

  this.sigmaGraph.addNode({ id: keyValues[1] }); //todo: dirty
  var nodes = this.sigmaGraph.nodes();
  var addedNode = nodes[nodes.length - 1];
  var vertex = new SigmaVertex(addedNode, this);
  // this.vertices.set(vertex.id, vertex);
  // console.log(keyValues);
  ElementHelper.attachProperties(vertex, keyValues); //todo: replace [] by keyValues

  return vertex;
};

SigmaGraph.prototype.V = function() {
  var traversal = new SigmaGraphTraversal(this, Vertex);

  return traversal;
};


SigmaGraph.prototype.getBaseGraph = function() {
  return this.sigmaGraph;
};


module.exports = SigmaGraph;