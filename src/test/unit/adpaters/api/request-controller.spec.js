import testCommons from '../../../lib/test-commons';
import requetService from '../../../../application/services/request-service';
import RequestDomain from '../../../../application/domain/request';
import FoodDomain from '../../../../application/domain/food';
import IngredientDomain from '../../../../application/domain/ingredient';
import IngredientFactory from '../../../lib/factories/ingredient-factory';
import FoodFactory from '../../../lib/factories/food-factory';
import RequestFactory from '../../../lib/factories/request-factory';
import { app, server } from '../../../../../app';
testCommons.init()

const requester = chai.request(app);
describe('request-controller', () => {
    context('retrieveAllRequests', () => {
        let resultData = null;
        const request = RequestFactory.build();

        before(() => testCommons.resetTestDB()
        .then(() => RequestDomain.create(request))
        .then(() => requester.get('/request/retrieveAll'))
        .then((result) => {
            resultData = result.body;
            return resultData;
        }));

        specify(() => resultData.length.should.be.equals(1));
        specify(() => resultData[0].status.should.be.equals(request.status));
        after(() => {
          
          testCommons.closeTestDB();
          
        });
    });
    context('create', () => {
        let resultData;
        const request = RequestFactory.build();
        before(() => testCommons.resetTestDB()
            .then(() => chai.request(app).post('/request/create')
                        .send({dataTO: request})
            )
            .then(() => RequestDomain.findOne())
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.status.should.be.equals('ativo'));

        after(() => testCommons.closeTestDB());
    });

    context('updateStatus', () => {
        let resultData;
        const request = RequestFactory.build();
        before(() => testCommons.resetTestDB()
            .then(() => RequestDomain.create(request))
            .then(() => chai.request(app).post(`/request/updateStatus/${request._id}`))
            .then(() => RequestDomain.findOne())
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.status.should.be.equals('cancelado'));
        specify(() => resultData.status.should.be.not.equals(request.status));

        after(() => testCommons.closeTestDB());
    });

    context('updateIngredientsInToRequest', () => {
        let resultData;
        const dataTO = {
            ingredients: [
              {
                _id: '000000000000000000000003',
                amount: 1
              }
            ],
            food: {
              price: 4.5,
              amount: 1,
              name: 'X-burger',
              _id: '000000000000000000000002',
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
                }
              ]
            },
            request: {
              requestList: [
                {
                  price: 4.5,
                  amount: 1,
                  name: 'X-burger',
                  _id: '000000000000000000000002',
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
                    }
                  ]
                }
              ],
              price: 4.5
            }
          };

          before(() => testCommons.resetTestDB()
            .then(() => IngredientDomain.create(dataTO.food.ingredients))
            .then(() => chai.request(app).post('/request/updateIngredientsInToRequest')
                        .send({ dataTO }))
            .then((result) => {
                resultData = result.body;
                return resultData;
            }));

            specify(() => resultData.price.should.be.equals(7.5));
            specify(() => resultData.requestList[0].price.should.be.equals(7.5));
            specify(() => resultData.requestList[0].ingredients[1].amount.should.be.equals(2));

        after(() => testCommons.closeTestDB())
    });

    context('calculateRequest', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            name: 'X-bacon',
            price: 6.50,
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
                _id: "000000000000000000000005",
                name: "Queijo",
                price: 1.5,
                amount: 1
              }
            ]
        }
        const requestListTO = [
            food
        ]

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => chai.request(app).post('/request/calculateRequest')
                        .send({ requestList: requestListTO }))
            .then((result) => {
                resultData = result.body;
                return resultData;
            }))
        specify(() => resultData.price.should.be.equals(6.5));
        after(() => testCommons.clearTestDB());
    });

});
