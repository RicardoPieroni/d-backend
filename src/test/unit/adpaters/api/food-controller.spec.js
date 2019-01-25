import testCommons from '../../../lib/test-commons';
import FoodDomain from '../../../../application/domain/food';
import FoodFactory from '../../../lib/factories/food-factory';

import { app, server } from '../../../../../app';
import IngredientFactory from '../../../lib/factories/ingredient-factory';


testCommons.init()

const agent = chai.request.agent(app)
describe('food-controller', () => {
    context('retrieveAllFoods', () => {
        let resultData = null;
        const food = FoodFactory.build();
        const ingredient = IngredientFactory.build();
        food.ingredients = [ingredient];
        before(() => testCommons.resetTestDB()
          .then(() => FoodDomain.create(food))
          .then(()=> agent.get('/food/retrieveAll'))
          .then((result) => {
            resultData = result.body;
            return resultData;
          })
          .catch(() => {
          })
        )
        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].name.should.be.equals(food.name));
        specify(() => resultData[0].ingredients[0].name.should.be.equals(ingredient.name));
        after(() => {
          testCommons.closeTestDB();
        });
    });
});