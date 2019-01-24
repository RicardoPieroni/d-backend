'use strict';

import utils from '../../../utils/writer';
import FoodService from '../../../application/services/food-service'

module.exports.retrieveAllFoods = function retrieveAllFoods (req, res, next) {
  FoodService.retrieveAllFoods()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
