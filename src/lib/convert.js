/**
 * OPTIMIZR.JS
 * ===========
 *
 * Node convertion methods
 *
 */
'use strict';

var create = require('./create');

var updateToExpression = function (update) {
  var operator, binary, assignment;

  operator = (update.operator == '++') ? '+' : '-';
  binary = create.binaryExpression(operator, update.argument, {
    'type': 'Literal',
    'value': 1,
    'raw': '1'
  });
  assignment = create.assignmentExpression('=', update.argument, binary);

  return create.expressionStatement(assignment);
};

var forToWhile = function (forStatement) {
  var update = (forStatement.update.type === 'UpdateExpression') ?
                updateToExpression(forStatement.update) : forStatement.update;
  var whileStatement = create.whileStatement(forStatement.test, update, forStatement.body);

  return [forStatement.init, whileStatement];
};

module.exports.updateToExpression = updateToExpression;
module.exports.forToWhile = forToWhile;
