var inherits = require('util').inherits;

var _ = require('underscore');
var Edge = require('gremlin-core-js/src/structure/edge');

var SigmaElement = require('./SigmaElement');

function SigmaEdge(baseEdge, graph) {
  SigmaElement.call(this, graph);
  this.baseElement = baseEdge;
}

inherits(SigmaEdge, SigmaElement); // extends
_.extend(SigmaEdge.prototype, Edge.prototype); // implements

// SigmaEdge.prototype.getIterators = function() {
//   // body...
// };


module.exports = SigmaEdge;