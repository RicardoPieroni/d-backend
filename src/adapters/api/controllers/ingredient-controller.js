'use strict';

import utils from '../../../utils/writer';
import IngredientService from '../../../application/services/ingredient-service';

module.exports.retrieveAllIngredients = function retrieveAllIngredients (req, res, next) {
  IngredientService.retrieveAllIngredients()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
