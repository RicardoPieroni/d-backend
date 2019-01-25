import testCommons from '../../lib/test-commons';
import foodService from '../../../application/services/food-service';
import FoodDomain from '../../../application/domain/food';
import IngredientFactory from '../../lib/factories/ingredient-factory';
import FoodFactory from '../../lib/factories/food-factory';

testCommons.init()

describe('ingredient-service', () => {
    context('retrieveAllFoods', () => {
        let resultData;
        const ingredient = IngredientFactory.build();
        const food = FoodFactory.build();
        food.ingredients = [ingredient];

        before(() => testCommons.resetTestDB()
        .then(() => FoodDomain.create(food))
        .then(() => foodService.retrieveAllFoods())
        .then((result) => {
            resultData = result;
            return resultData;
        }))

        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].name.should.be.equals(food.name));
        after(() => testCommons.closeTestDB())
    });
});