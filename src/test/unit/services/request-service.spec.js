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
        after(() => testCommons.closeTestDB());
    });
    context('promotionFilter when the food dont have items that to be apply on filter', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            price: 6.5,
            name: 'X-bacon',
            ingredients: [
              {
                _id: '000000000000000000000002',
                name: 'Bacon',
                price: 2,
                amount: 1
              },
              {
                _id: '000000000000000000000003',
                name: 'Hambúrguer de carne',
                price: 3,
                amount: 1
              },
              {
                _id: '000000000000000000000005',
                name: 'Queijo',
                price: 1.5,
                amount: 1
              }
            ]
          };
          const foodCloned = {...food};
          delete foodCloned.price;
          delete foodCloned.name;

          const requestTO = [
              foodCloned
          ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.promotionFilter(requestTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.length.should.be.equals(1))
        specify(() => resultData[0].ingredients[0].amount.should.be.equals(food.ingredients[0].amount));
        specify(() => resultData[0].ingredients[1].amount.should.be.equals(food.ingredients[1].amount));
        specify(() => resultData[0].ingredients[2].amount.should.be.equals(food.ingredients[2].amount));

        after(() => testCommons.closeTestDB());
    });

    context('promotionFilter when the "light" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            price: 6.5,
            name: 'X-bacon',
            ingredients: [
              {
                _id: '000000000000000000000003',
                name: 'Hambúrguer de carne',
                price: 3,
                amount: 1
              },
              {
                _id: '000000000000000000000005',
                name: 'Queijo',
                price: 1.5,
                amount: 1
              },
              {
                _id: '000000000000000000000001',
                name: 'Alface',
                price: 0.40,
                amount: 1
              },
            ]
          };
          const requestTO = [
              food
          ];

          const rebate = 0.10;

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.promotionFilter(requestTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.length.should.be.equals(1))
        specify(() => resultData[0].ingredients[0].amount.should.be.equals(food.ingredients[0].amount));
        specify(() => resultData[0].ingredients[1].amount.should.be.equals(food.ingredients[1].amount));
        specify(() => resultData[0].ingredients[2].amount.should.be.equals(food.ingredients[2].amount));
        specify(() => resultData[0].ingredients[2].rebate.should.be.equals(rebate));

        after(() => testCommons.closeTestDB());
    });

    context('promotionFilter when the "Muita Carne" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            price: 6.5,
            name: 'X-bacon',
            ingredients: [
              {
                _id: '000000000000000000000003',
                name: 'Hambúrguer de carne',
                price: 3,
                amount: 3
              },
              {
                _id: '000000000000000000000005',
                name: 'Queijo',
                price: 1.5,
                amount: 1
              },
            ]
          };
          const requestTO = [
              food
          ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.promotionFilter(requestTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.length.should.be.equals(1))
        specify(() => resultData[0].ingredients[0].amount.should.be.equals(2));
        specify(() => resultData[0].ingredients[1].amount.should.be.equals(food.ingredients[1].amount));

        after(() => testCommons.closeTestDB());
    });

    context('promotionFilter when the "Muito Queijo" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            price: 6.5,
            name: 'X-bacon',
            ingredients: [
              {
                _id: '000000000000000000000003',
                name: 'Hambúrguer de carne',
                price: 3,
                amount: 1
              },
              {
                _id: '000000000000000000000005',
                name: 'Queijo',
                price: 1.5,
                amount: 6
              },
            ]
          };
          const requestTO = [
              food
          ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.promotionFilter(requestTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.length.should.be.equals(1))
        specify(() => resultData[0].ingredients[0].amount.should.be.equals(food.ingredients[0].amount));
        specify(() => resultData[0].ingredients[1].amount.should.be.equals(4));

        after(() => testCommons.closeTestDB());
    });

    after(() =>  process.exit(0));
});