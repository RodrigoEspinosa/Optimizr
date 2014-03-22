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
var escodegen = require('escodegen');

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

var createBlockStatement = function (statements) {
  return {
    'type': 'BlockStatement',
    'body': statements
  }
};

var createWhileStatement = function (testExpression, updateExpression, bodyStatement) {
  var body = createBlockStatement([updateExpression, bodyStatement])
  return {
    'type': 'WhileStatement',
    'test': testExpression,
    'body': body
  }
};

var updateToExpression = function (update) {
  return {
    'type': 'ExpressionStatement',
    'expression': {
      'type': 'AssignmentExpression',
      'operator': '=',
      'left': update.argument,
      'right': {
        'type': 'BinaryExpression',
        'operator': (update.operator == '++') ? '+' : '-',
        'left': update.argument,
        'right': {
          'type': 'Literal',
          'value': 1,
          'raw': '1'
        }
      }
    }
  }
};

var forToWhile = function (forStatement) {
  var update = (forStatement.update.type === 'UpdateExpression') ? updateToExpression(forStatement.update) : forStatement.update;
  return createWhileStatement(forStatement.test, update, forStatement.body);
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
          // console.log('init');
          // console.log('test');
          // console.log('update');
          // console.log('body');
          var newWhile = forToWhile(node);
          var output = escodegen.generate(newWhile);

          console.log(output);
        }
      }
    });
  });
} else {
  console.log('ERROR: 404');
}
