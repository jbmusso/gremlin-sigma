
function SigmaVertexIterator(edges, direction) {
  this.edges = edges;
  this.direction = direction;
}

SigmaVertexIterator.prototype.next = function() {
  var SigmaVertex = require('../structure/SigmaVertex');

  var next = this.edges.next();
  if (next.done) {
    return next; // exit
  }

  var nextEdge = next.value;
  var graph = nextEdge.graph;
  var baseGraph = graph.getBaseGraph();
  var baseElement = nextEdge.baseElement;
  var vertexId;

  if (this.direction === "in") {
    vertexId = baseElement.source;
  } else {
    vertexId = baseElement.target;
  }

  var sigmaNode = baseGraph.internals().nodesIndex[vertexId];
  var vertex = new SigmaVertex(sigmaNode, graph);
  var ret = { value: vertex, done: false };

  return ret;
};


module.exports = SigmaVertexIterator;