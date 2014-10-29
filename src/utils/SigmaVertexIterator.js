
function SigmaVertexIterator(edges, direction) {
  this.edges = edges;
  this.direction = direction;
}

SigmaVertexIterator.prototype.next = function() {
  var SigmaVertex = require('../structure/SigmaVertex');

  var next = this.edges.next();
  var nextEdge = next.value;
  var vertexId;
  var vertex;
  var node;

  if (next.done) {
    return next; // exit
  }

  var graph = nextEdge.graph;
  var baseGraph = graph.getBaseGraph();

  if (this.direction === "in") {
    vertexId = nextEdge.baseElement.source;
  } else {
    vertexId = nextEdge.baseElement.target;
  }

  // This is O(|V|) and should be improved with indices
  // This could be moved to SigmaHelper
  node = baseGraph.nodes().filter(function(node) {
    return node.id === vertexId;
  })[0];

  vertex = new SigmaVertex(node, graph);
  var ret = { value: vertex, done: false };

  return ret;
};


module.exports = SigmaVertexIterator;