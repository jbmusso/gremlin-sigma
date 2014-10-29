var sigma = require('sigma');

var SigmaGraph = require('../src/structure/SigmaGraph');


var s = new sigma();

var g = SigmaGraph.open(s.graph);

var foo = g.addVertex('id', 'n0', 'name', 'foo');
var bar = g.addVertex('id', 'n1', 'name', 'bar');
foo.addEdge('likes', bar);

g.V().out().forEach(function(vertex) {
  console.log('---');
  console.log(vertex.property('name'), '+++');
});