import testCommons from '../../lib/test-commons';
import requetService from '../../../application/services/request-service';
import RequestDomain from '../../../application/domain/request';
import FoodDomain from '../../../application/domain/food';
import IngredientDomain from '../../../application/domain/ingredient';
import IngredientFactory from '../../lib/factories/ingredient-factory';
import FoodFactory from '../../lib/factories/food-factory';
import RequestFactory from '../../lib/factories/request-factory';

testCommons.init()

describe('request-service', () => {
    context('retrieveAllRequests', () => {
        let resultData;
        const ingredient = IngredientFactory.build();
        const food = FoodFactory.build();
        food.ingredients = [ingredient];
        const request = RequestFactory.build();
        request.requestList = [food]

        before(() => testCommons.resetTestDB()
        .then(() => RequestDomain.create(request))
        .then(() => requetService.retrieveAllRequests())
        .then((result) => {
            resultData = result;
            return resultData;
        }))

        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].status.should.be.equals(request.status));
        after(() => {
            testCommons.closeTestDB();
            process.exit( 0 );
        })
    });
});