import testCommons from '../../lib/test-commons';
import ingredientService from '../../../application/services/ingredient-service';
import IngredientDomain from '../../../application/domain/ingredient';
import IngredientFactory from '../../lib/factories/ingredient-factory';

testCommons.init()

describe('ingredient-service', () => {
    context('retrieveAllIngredients', () => {
        let resultData;
        const ingredient = IngredientFactory.build();
        before(() => testCommons.resetTestDB()
        .then(() => IngredientDomain.create(ingredient))
        .then(() => ingredientService.retrieveAllIngredients())
        .then((result) => {
            resultData = result;
            return resultData;
        }))

        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].name.should.be.equals(ingredient.name));
        after(() => testCommons.closeTestDB())
    });
});