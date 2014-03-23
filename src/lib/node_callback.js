/**
 * OPTIMIZR.JS
 * ===========
 *
 * Node callbacks methods.
 * Each method represents the name of the node type you want to handle.
 *
 */
'use strict';

var escodegen = require('escodegen'),
    convert = require('./convert');

var callback = {
  ForStatement: function (node) {
    var newWhile = convert.forToWhile(node);
    var output = escodegen.generate(newWhile);

    console.log(output);
  }
};

module.exports = callback;
