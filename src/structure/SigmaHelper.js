require('es6-shim');
var _ = require('underscore');

var MultiIterator = require('gremlin-core-js/src/process/util/multiiterator');

var SigmaVertexIterator = require('../utils/SigmaVertexIterator');


function SigmaHelper() {
}

SigmaHelper.getVertices = function(structure, direction, branchFactor, labels) {
  // console.log(structure.constructor.name);
  var vertex;
  var edge;
  var graph;
  // Temp workaround against circle require
  var SigmaEdge = require('./SigmaEdge');
  var SigmaVertex = require('./SigmaVertex');

  if (structure instanceof SigmaVertex) { // structure = vertex
    vertex = structure;
    return SigmaHelper.getVerticesFromVertex(vertex, direction, branchFactor, labels);
  } else if (structure instanceof SigmaEdge) { // structure = edge
    edge = structure;
    return SigmaHelper.getVerticesFromEdge(edge, direction);
  } else { // structure = graph
    graph = structure;
    return Array.from(graph.vertices);
  }
};

SigmaHelper.getVerticesFromVertex = function(vertex, direction, branchFactor, labels) { // JS specific method
  var edges;
  var vertexIterator;
  var vertices;
  var outVertexIterator;
  var inVertexIterator;

  if (direction !== "both") {
    edges = SigmaHelper.getEdges(vertex, direction, branchFactor, labels);

    vertexIterator = new SigmaVertexIterator(edges, direction);
    return vertexIterator;
  } else {
    vertices = new MultiIterator(branchFactor);
    outVertexIterator = new SigmaVertexIterator(SigmaHelper.getEdges(vertex, 'out', branchFactor, labels), 'out');
    inVertexIterator = new SigmaVertexIterator(SigmaHelper.getEdges(vertex, 'in', branchFactor, labels), 'in');

    vertices.addIterator(outVertexIterator);
    vertices.addIterator(inVertexIterator);

    return vertices;
  }
};

SigmaHelper.getVerticesFromEdge = function(edge, direction) { // JS specific method
  var vertices = [];

  if (direction === 'out' || direction === 'both') {
    vertices.push(edge.outVertex);
  }

  if (direction === 'in' || direction === 'both') {
    vertices.push(edge.inVertex);
  }

  return vertices.values(); // iterator
};

SigmaHelper.getEdges = function(structure, direction, branchFactor, labels) {
  if (structure.constructor.name === 'SigmaVertex') {
    var vertex = structure;
    return SigmaHelper.getEdgesFromVertex(vertex, direction, branchFactor, labels);
  } else {
    return SigmaHelper.getEdgesFromGraph();
  }
};

/**
 * Returns an edge iterator for a given vertex, with edges being filtered by
 * direction and/or labels.
 *
 * @return {Iterator}
 */
SigmaHelper.getEdgesFromVertex = function(vertex, direction, branchFactor, labels) { // JS specific method
  var SigmaEdge = require('./SigmaEdge');
  // console.log(arguments);
  var baseElement = vertex.baseElement;
  var baseGraph = vertex.graph.getBaseGraph();
  var baseEdges = baseGraph.edges();

  var edges = new MultiIterator();
  var iterator;
  var baseVertexId = vertex.baseElement.id;
  var chain;

  if (direction === 'out' || direction === 'both') {
    var outEdges = baseGraph.internals().outNeighborsIndex[baseVertexId];

    // TODO: improve performance, do the following lazily
    chain = _.chain(Object.values(outEdges))
      .map(function(node) { return Object.values(node); })
      .flatten();

    if (labels.length > 0) {
      chain = chain.filter(function(edge) {
        return labels.indexOf(edge._label) >= 0;
      });
    }

    chain = chain.map(function(edge) {
      return new SigmaEdge(edge, vertex.graph);
    });

    return chain.value().values(); // Get _.chain value then ES6 iterator
  }

  if (direction === 'in' || direction === 'both') {
    var inEdges = baseGraph.internals().inNeighborsIndex[baseVertexId];

    // TODO: improve performance, do the following lazily
    chain = _.chain(Object.values(inEdges))
      .map(function(node) { return Object.values(node); })
      .flatten();

    if (labels.length > 0) {
      chain = chain.filter(function(edge) {
        return labels.indexOf(edge._label) >= 0;
      });
    }

    chain = chain.map(function(edge) {
      return new SigmaEdge(edge, vertex.graph);
    });

    return chain.value().values(); // Get _.chain value then ES6 iterator
  }

  return new SigmaEdgeIterator(edges, branchFactor);
};

SigmaHelper.getEdgesFromGraph = function() { // JS specific
  throw new Error('Not yet implemented in SigmaHelper.getEdgesFromGraph');
};

SigmaHelper.SigmaVertexVertexIterable = function(vertex, direction, labels) {
  this.graph = vertex.graph;
  this.node = vertex.getBaseVertex();
  this.direction = 'both'; //todo: allow in and out directions from Sigma?
};

// SigmaHelper.SigmaVertexVertexIterable.prototype = {
//   iterator: function() {
//     // var iterator = this.node
//   }
// };

module.exports = SigmaHelper;