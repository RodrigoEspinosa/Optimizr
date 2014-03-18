(function () {
  'use strict';

  var fs = require('fs');

  // Iterators RegExps
  var iterators = {
    for: function () {
      return new RegExp(/for \((.*)\)/);
    }
  };

  var getBody = function (data) {
    return data.match(/for \(.*\)\n.*/);
  }

  var getIteratorBody = function (data, regExp) {
    var response = data.match(/for \((.*)\)\n(.*)/)[2];
    return response + '\n';
  };

  var replacers = {
    // iterator = {i,e,c},
    while: function (expresion, body) {
      var a = expresion.split(';'),
          response = '';
      if (a[0].length > 3 && a[0].substr(0, 3) === 'var')
        response += a[0] + ';\n';

      response += 'while (' + a[1] + ') {\n';
      response += a[2] + ';\n';
      response += body;
      response += '}\n';
      return response;
    }
  }

  // Get the filename
  var filename = 'example.js';

  // Get the encoding
  var encoding = 'utf8';

  // Check if file exists
  if (fs.existsSync(filename)) {

    // Read the file
    fs.readFile(filename, {encoding: encoding}, function (err, data) {

      // Match every iterator
      for (var iterator in iterators) {
        if (typeof iterators[iterator] === 'function') {
          var dataMatch = data.match(iterators[iterator]());

          // Check if there's a match
          if (dataMatch) {
            // Get the iterator body
            var body = getIteratorBody(data, iterator);
            // Replace for every diferent iterator
            for (var replacer in replacers) {
              if (replacer !== iterator){
                var alternative = replacers[replacer](dataMatch[1], body);
                // console.log(alternative);
                var res = data.replace(getBody(data), alternative);
                console.log(res);
              }
            }
          }
        }
      }

    });
  } else {
    // Throw an file-not-found error
    console.log('ERROR! File don\'t exists');
  }

}());
