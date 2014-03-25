/**
 * OPTIMIZR.JS
 * ===========
 *
 * Improve the iterators.
 *
 */
'use strict';

var fs = require('fs'),
    esprima = require('esprima'),
    escodegen = require('escodegen'),
    create = require('./src/lib/create'),
    convert = require('./src/lib/convert'),
    callback = require('./src/lib/node_callback');

// Get the filename
var filename = process.argv[2] || 'examples/example.js';
// Get the encoding
var encoding = process.argv[3] || 'utf8';

// Read a specific node and loop to his decendents
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

var isChildren = function (ast, node) {
  for (var i in ast) {
    if (ast[i] == node)
      return true;
  }
  return false;
};

var findParent = function (ast, node) {
  if (isChildren) {
    return ast;
  } else {
    for (var i in ast) {
      if (isChildren(ast[i], node)) {
        return ast[i];
      } else {
        return findParent(ast[i], node);
      }
    }
  }
};

// Check if file exists
if (fs.existsSync(filename)) {
  // Read the file
  fs.readFile(filename, {encoding: encoding}, function (err, data) {
    // Create the abstract syntax tree for the input file
    var ast = esprima.parse(data, {
      loc: true,
      range: true,
      tokens: false,
      tolerant: true
    });
    // Read an loop from the root node
    readNode(ast['body'], function (node) {
      // Check if the node is an object and has a callback
      if (typeof node === 'object' && node.type in callback) {
        var newNodes = callback[node.type](node);
        // console.log(escodegen.generate(newNodes));

        var parent = findParent(ast, node);
        console.log(node);
        console.log(parent);

        var outputScript = escodegen.generate(ast);
        // console.log(outputScript);
      }
    });
  });
} else {
  console.log('ERROR: 404');
}
