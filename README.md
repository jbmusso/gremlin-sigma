gremlin-sigma
=============

Manipulate Sigma.js graphs in the browser using pure JavaScript Gremlin graph traversals. This library does not require any remote graph database such as Titan, Neo4j or OrientDB.

Gremlin-Sigma is currently being developed using Sigma.js v1.0.3.

### Installation and dependencies

Gremlin-Sigma simply wraps a Sigma.js instance. Therefore, you're required to add the Sigma.js dependency yourself to your project.

The other main dependency is [gremlin-core-js](https://github.com/gulthor/gremlin-core-js), a 1:1 JavaScript port of TinkerPop3 Gremlin graph traversal engine. Issues regarding missing or bugged Gremlin steps should opened in the [gremlin-core-js issues section](https://github.com/gulthor/gremlin-core-js/issues).

### Running the examples

* clone the repository
* install dependencies with `npm install`
* build gremlin-sigma with `gulp build`
* start a local http server with `npm start` (listens on port 8080)
* open a browser and go to http://localhost:8080/examples

