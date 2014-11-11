gremlin-sigma
=============

Manipulate Sigma.js graphs in the browser using pure JavaScript Gremlin graph traversals. This library does not require any remote graph database such as Titan, Neo4j or OrientDB.

Gremlin-Sigma is currently being developed using Sigma.js v1.0.3.

### Installation and dependencies

Gremlin-Sigma simply wraps a Sigma.js instance. Therefore, you're required to add the Sigma.js dependency yourself to your project.

The other main dependency is [gremlin-core-js](https://github.com/gulthor/gremlin-core-js), a 1:1 JavaScript port of TinkerPop3 Gremlin graph traversal engine. Issues regarding missing or bugged Gremlin steps should opened in the [gremlin-core-js issues section](https://github.com/gulthor/gremlin-core-js/issues).

The last dependency is Underscore.js, though this may be replaced with Lodash or Lazy.js.

### Executing Gremlin traversals on a Sigma.js graph

Quick Gremlin traversal example, assuming you're using Browserify:

```javascript
var sigma = require('sigma');
var SigmaGraph = require('gremlin-sigma').SigmaGraph;

var g = SigmaGraph.open(sigma);

var alice = g.addVertex('id', 'n0', 'name', 'alice');
var bob = g.addVertex('id', 'n1', 'name', 'bob');
alice.addEdge('likes', bob, { id: 'e0' });
alice.addEdge('knows', alice, { id: 'e1' });

// Traversal example: for each vertices (nodes), iterate through all their
// respective out vertices linked with 'likes' label.
g.V().out('likes').forEach(function(vertex) {
    // vertex.name === 'bob'
});
```
For a list of currently supported steps, please have a look at [tinkergraph-js](https://github.com/gulthor/tinkergraph-js), the reference in-memory JavaScript graph database that implements [gremlin-core-js](https://github.com/gulthor/gremlin-core-js).

### Running the examples

* clone the repository
* install dependencies with `npm install`
* build gremlin-sigma with `gulp build`
* start a local http server with `npm start` (listens on port 8080)
* open a browser and go to [http://localhost:8080/examples](http://localhost:8080/examples)
    - go to [/examples/browser.html](http://localhost:8080/examples/browser.html), you should see a simple graph with 2 vertices and 1 edge.
