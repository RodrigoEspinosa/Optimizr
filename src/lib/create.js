/**
 * OPTIMIZR.JS
 * ===========
 *
 * Node creator methods
 *
 */
(function () {
  'use strict';

  var blockStatement = function (statements) {
    return {
      'type': 'BlockStatement',
      'body': statements
    };
  };

  var whileStatement = function (testExpression, updateExpression, bodyStatement) {
    var body = blockStatement([updateExpression, bodyStatement]);
    return {
      'type': 'WhileStatement',
      'test': testExpression,
      'body': body
    };
  };

  var binaryExpression = function (operator, left, right) {
    return {
      'type': 'BinaryExpression',
      'operator': operator,
      'left': left,
      'right': right
    };
  };

  var expressionStatement = function (expression) {
    return {
      'type': 'ExpressionStatement',
      'expression': expression
    };
  };

  var assignmentExpression = function (operator, left, right) {
    return {
      'type': 'AssignmentExpression',
      'operator': '=',
      'left': left,
      'right': right
    };
  };

  var variableDeclaration = function (variableDeclarator, kind) {
    variableDeclarator = [variableDeclarator];
    return {
      type: 'VariableDeclaration',
      declarations: variableDeclarator,
      kind: kind || 'var'
    };
  };

  var variableDeclarator = function (id, initExpression) {
    return {
      type: 'VariableDeclarator',
      id: id,
      init: initExpression || null
    };
  };

  module.exports.blockStatement = blockStatement;
  module.exports.whileStatement = whileStatement;
  module.exports.binaryExpression = binaryExpression;
  module.exports.expressionStatement = expressionStatement;
  module.exports.assignmentExpression = assignmentExpression;
  module.exports.variableDeclaration = variableDeclaration;
  module.exports.variableDeclarator = variableDeclarator;

}).call(this);
