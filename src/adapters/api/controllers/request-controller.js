'use strict';

import utils from '../../../utils/writer';
import RequestService from '../../../application/services/request-service';

module.exports.calculateRequest = function calculateRequest (req, res, next) {
  const requestList = req.swagger.params['requestList'].value;
  RequestService.calculateRequest(requestList)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.create = function create (req, res, next) {
  const dataTO = req.swagger.params['dataTO'].value;
  RequestService.create(dataTO)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveAllRequests = function retrieveAllRequests (req, res, next) {
  RequestService.retrieveAllRequests()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateIngredientsInToRequest = function updateIngredientsInToRequest (req, res, next) {
  const dataTO = req.swagger.params['dataTO'].value;
  RequestService.updateIngredientsInToRequest(dataTO)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateStatus = function updateStatus (req, res, next) {
  const id = req.swagger.params['id'].value;
  RequestService.updateStatus(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
