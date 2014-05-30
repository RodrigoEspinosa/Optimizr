/**
 * OPTIMIZR.JS
 * ===========
 *
 * Node callbacks methods.
 * Each method represents the name of the node type you want to handle.
 *
 */
(function () {
  'use strict';

  var escodegen = require('escodegen'),
      convert = require('./convert');

  var callback = {
    ForStatement: function (node) {
      // Convert a 'for' node to 'while' node
      return convert.forToWhile(node);
    }
  };

  module.exports = callback;

}).call(this);
