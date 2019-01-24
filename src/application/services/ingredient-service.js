'use strict';


/**
 *
 * returns List
 **/
exports.retrieveAllIngredients = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "price" : 0.8008281904610115,
  "name" : "name",
  "_id" : "_id"
}, {
  "price" : 0.8008281904610115,
  "name" : "name",
  "_id" : "_id"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

