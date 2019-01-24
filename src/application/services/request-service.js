'use strict';


/**
 * this route is used to calculate the values of request order
 *
 * requestList RequestList List of foods to generate request (optional)
 * returns request
 **/
exports.calculateRequest = function(requestList) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "number" : "number",
  "requestList" : [ {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  }, {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  } ],
  "price" : 0.8008281904610115,
  "requestDate" : "requestDate",
  "_id" : "_id",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * dataTO DataTO_1  (optional)
 * no response value expected for this operation
 **/
exports.create = function(dataTO) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 *
 * returns List
 **/
exports.retrieveAllRequests = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "number" : "number",
  "requestList" : [ {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  }, {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  } ],
  "price" : 0.8008281904610115,
  "requestDate" : "requestDate",
  "_id" : "_id",
  "status" : "status"
}, {
  "number" : "number",
  "requestList" : [ {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  }, {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  } ],
  "price" : 0.8008281904610115,
  "requestDate" : "requestDate",
  "_id" : "_id",
  "status" : "status"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * this route is used to update the ingredients from food and recalculate the valus of request order
 *
 * dataTO DataTO  (optional)
 * returns request
 **/
exports.updateIngredientsInToRequest = function(dataTO) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "number" : "number",
  "requestList" : [ {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  }, {
    "price" : 0.8008281904610115,
    "name" : "name",
    "ingredients" : [ {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    }, {
      "price" : 0.8008281904610115,
      "name" : "name",
      "_id" : "_id"
    } ],
    "_id" : "_id"
  } ],
  "price" : 0.8008281904610115,
  "requestDate" : "requestDate",
  "_id" : "_id",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 *
 * id String 
 * no response value expected for this operation
 **/
exports.updateStatus = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

