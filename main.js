/**
 * OPTIMIZR.JS
 * ===========
 *
 * Improve the iterators.
 *
 */
'use strict';

var fs = require('fs');
var esprima = require('esprima');

/* Open the file */
// Get the filename
var filename = 'examples/example.js';
// Get the encoding
var encoding = 'utf8';

var readNode = function (treeNode, callback) {
  // Execute the callback for the actual node
  if (typeof callback === 'function')
    callback(treeNode);

  // Loop throught the node childs
  for (var child in treeNode) {
    if (treeNode.hasOwnProperty(child)) {
      if (typeof treeNode[child] === 'object' && treeNode[child] !== null)
        readNode(treeNode[child], callback);
    }
  }
};

// Check if file exists
if (fs.existsSync(filename)) {
  // Read the file
  fs.readFile(filename, {encoding: encoding}, function (err, data) {
    var ast = esprima.parse(data, {
      loc: true,
      range: true,
      tokens: false,
      tolerant: true
    });
    readNode(ast['body'], function (node) {
      if (typeof node === 'object') {
        if (node.type === 'ForStatement') {
          console.log('init');
          console.log('test');
          console.log('update');
          console.log('body');
        }
      }
    });
  });
} else {
  console.log('ERROR: 404');
}
