var inherits = require('util').inherits;

var DefaultGraphTraversal = require('gremlin-core-js/src/process/graph/util/DefaultGraphTraversal');

var SigmaGraphStep = require('./step.sideEffect/SigmaGraphStep');
// var SigmaGraphStrategy = require('./strategy/SigmaGraphStepStrategy');


function SigmaGraphTraversal(graph, elementClass) {
  DefaultGraphTraversal.call(this, graph);

  // this.getStrategies().register(SigmaGraphStrategy.instance());
  this.addStep(new SigmaGraphStep(this, elementClass, graph));
}

inherits(SigmaGraphTraversal, DefaultGraphTraversal);

module.exports = SigmaGraphTraversal;