import testCommons from '../../../lib/test-commons';
import IngredientDomain from '../../../../application/domain/ingredient';
import IngredientFactory from '../../../lib/factories/ingredient-factory';

import { app, server } from '../../../../../app';


testCommons.init()

const requester = chai.request(app);
describe('ingredient-controller', () => {
    context('retrieveAllIngredients', () => {
        let resultData = null;
        const ingredient = IngredientFactory.build();
        before(() => testCommons.resetTestDB()
          .then(() => IngredientDomain.create(ingredient))
          .then(()=> requester.get('/ingredients/retrieveAll'))
          .then((result) => {
            resultData = result.body;
            
            return Promise.resolve(resultData);
          }).then(() => requester.close())
        )
        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].name.should.be.equals(ingredient.name));
        after(() => {
          
          testCommons.closeTestDB();
          
        });
    });
});