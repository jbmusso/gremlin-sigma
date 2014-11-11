var sigma = require('sigma');

var SigmaGraph = require('../src/structure/SigmaGraph');


var g = SigmaGraph.open(sigma);

var foo = g.addVertex('id', 'n0', 'name', 'foo');
var bar = g.addVertex('id', 'n1', 'name', 'bar');
foo.addEdge('likes', bar, { id: 'e0' });
bar.addEdge('knows', foo, { id: 'e1' });

g.V().out().forEach(function(vertex) {
  console.log('*', vertex.property('name'));
});
