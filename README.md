Optimizr
========


**Seek for script optimizations.**

This tool will help you find the faster
iterator for your alogoritms in order to make them faster.

Optimizr is by itself three basic modules:
 - **Create** For node generation.
 - **Convert** For converting one node into another.
 - **Callback** For doing an action when a node is found.

Every node with a callback should return an array of nodes.
Those will be replaced generating a new script.
