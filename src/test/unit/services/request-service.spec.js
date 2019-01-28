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
            .then(() => requetService.calculateRequest(requestListTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }))
        specify(() => resultData.price.should.be.equals(6.5));
        after(() => testCommons.clearTestDB());
    });

    context('calculateRequest when the "light" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            name: 'X-burguer',
            price: 4.50,
            ingredients: [
              {
                _id: '000000000000000000000001',
                name: 'Alface',
                price: 0.40,
                amount: 1,
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
        ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.calculateRequest(requestListTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }))
        specify(() => resultData.price.should.be.equals(4.41));
        after(() => testCommons.clearTestDB());
    });

    context('calculateRequest when the "Muita Carne" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            name: 'X-burguer',
            price: 4.50,
            ingredients: [
              {
                _id: '000000000000000000000003',
                name: 'Hambúrguer de carne',
                price: 3,
                amount: 6
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
        ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.calculateRequest(requestListTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }))
        specify(() => resultData.price.should.be.equals(13.5));
        specify(() => resultData.requestList[0].ingredients[0].amount.should.be.equals(4))
        after(() => testCommons.clearTestDB());
    });

    context('calculateRequest when the "Muito Queijo" promotion must be apply', () => {
        let resultData;
        const food = {
            _id: '000000000000000000000001',
            amount: 1,
            name: 'X-burguer',
            price: 4.50,
            ingredients: [
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
                amount: 6
              }
            ]
        }
        const requestListTO = [
            food
        ];

        before(() => testCommons.resetTestDB()
            .then(() => FoodDomain.create(food))
            .then(() => requetService.calculateRequest(requestListTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }))
        specify(() => resultData.price.should.be.equals(9));
        specify(() => resultData.requestList[0].ingredients[1].amount.should.be.equals(4))
        after(() => testCommons.clearTestDB());
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
            .then(() => requetService.updateIngredientsInToRequest(dataTO))
            .then((result) => {
                resultData = result;
                return resultData;
            }));

            specify(() => resultData.price.should.be.equals(7.5));
            specify(() => resultData.requestList[0].price.should.be.equals(7.5));
            specify(() => resultData.requestList[0].ingredients[1].amount.should.be.equals(2));

        after(() => testCommons.closeTestDB())
    });
    context('updateStatus', () => {
        let resultData;
        const request = RequestFactory.build();
        before(() => testCommons.resetTestDB()
            .then(() => RequestDomain.create(request))
            .then(() => requetService.updateStatus(request._id))
            .then(() => RequestDomain.findOne())
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.status.should.be.equals('cancelado'));
        specify(() => resultData.status.should.be.not.equals(request.status));

        after(() => testCommons.closeTestDB());
    });

    context('create', () => {
        let resultData;
        const request = RequestFactory.build();
        before(() => testCommons.resetTestDB()
            .then(() => requetService.create(request))
            .then(() => RequestDomain.findOne())
            .then((result) => {
                resultData = result;
                return resultData;
            }));
        specify(() => resultData.status.should.be.equals('ativo'));

        after(() => testCommons.closeTestDB());
    });

    after(() =>  process.exit(0));
});