
import RequestDomain from '../domain/request';
import FoodService from '../services/food-service';
import IngredientService from '../services/ingredient-service';
import Promise from 'bluebird';
import moment from 'moment';
import { ObjectID } from 'mongodb';

class RequestService {

  constructor() {
    this.BACON = 'Bacon';
    this.MEET_BURGUER = 'Hambúrguer de carne';
    this.LETTUCE = 'Alface';
    this.CHEESE = 'Queijo';
    this.BREAD = 'Pão'
    this.STATUS_CANCELED = 'cancelado';
    this.STATUS_ACTIVED = 'ativo';
  }

  /**
 * this service is used to calculate the values of request order
 *
 * requestList RequestList List of foods to generate request (optional)
 * returns request
 **/
  calculateRequest(requestList){
    let total = 0;
    const requestListUpdated = [];
    return this.promotionFilter(requestList)
        .then((result) => {
            return Promise.mapSeries(result, (requestItem) => {
                return FoodService.retrieveFoodById(requestItem._id)
                    .then((foodResult) => {
                        let food = foodResult;
                        if (requestItem.name && requestItem.price) {
                            food = requestItem;
                        }
                        const ingredients = food.ingredients;
                        const sumOfRebate = ingredients.reduce((a, b) => {
                            if (b.rebate) {
                                return a + b.rebate;
                            }
                            return 0 + a;
                        },0);
                        
                        const sumOfIngredients = ingredients.reduce((a, b) => {
                            return (a + (b.price) * b.amount);
                        }, 0);
                        let priceOfItem = (sumOfIngredients * Number(requestItem.amount));
                        const valueOfRebate = priceOfItem * sumOfRebate;
                        priceOfItem = priceOfItem - valueOfRebate;
                        requestItem.price = priceOfItem;
                        total = total +  priceOfItem;
                        requestListUpdated.push(requestItem);
                        return Promise.resolve(requestListUpdated);
                    });
                }).then(() => {
                    const request = {
                        requestList: requestListUpdated,
                    };
                    request.price = total;
                    return Promise.resolve(request);
                });
        });
    }

  /**
   * 
   * @param {*} dataTO 
   */
  create(dataTO){
    dataTO.status = this.STATUS_ACTIVED;
    dataTO.requestDate = moment();

    return RequestDomain.findOne().sort({requestDate : 1 })
    .then((result) => {
        if (result) {
            dataTO.number = result.number + 1;
        }
        dataTO.number = 1;
        return RequestDomain.create(dataTO);
    })
  }

  /**
   * 
   */
  retrieveAllRequests(){
    return RequestDomain.find();
  }

  /**
 * this route is used to update the ingredients from food and recalculate the valus of request order
 *
 * dataTO DataTO  (optional)
 * returns request
 **/
  updateIngredientsInToRequest(dataTO) {
    const { ingredients, food, request } = dataTO;
    const foodCloned = Object.assign({},food);
    const ingredientsUpdated = []
    return Promise.mapSeries(ingredients, (ingredient) => {
        const referenceIngredient = food.ingredients.find((item) => item._id === ingredient._id);

        if (referenceIngredient) {
            const amount = Number(referenceIngredient.amount) + Number(ingredient.amount);
            const name = referenceIngredient.name;
            const price = referenceIngredient.price;
            foodCloned.ingredients = foodCloned.ingredients.filter((item) => item._id !== referenceIngredient._id); // removing the future duplicate objct
            ingredientsUpdated.push({
                amount,
                name,
                price,
                _id: referenceIngredient._id
            });
        } else {
            return IngredientService.retrieveIngredientById(ingredient._id)
                .then((ingredientResult) => {
                    ingredientResult.amount = Number(ingredient.amount);
                    ingredientsUpdated.push(ingredientResult);
                    return Promise.resolve();
                });
        }

        return Promise.resolve();
    }).then(() => {
        foodCloned.ingredients = foodCloned.ingredients.concat(ingredientsUpdated);
        const requestList = request.requestList;
        const requestListUpdated = requestList.map((requestItem) => {
            if (requestItem._id === foodCloned._id) {
                return foodCloned;
            }
            return requestItem;
        })
        return this.calculateRequest(requestListUpdated);
    });

  }

  updateStatus(id) {
    const status = this.STATUS_CANCELED;
    return RequestDomain.update({_id: new ObjectID(id) }, { $set: { status }});
  }

  promotionFilter(requestListTO) {
    const requestListUpdated = [];
    return Promise.mapSeries(requestListTO, (requestItem) => {
        return FoodService.retrieveFoodById(requestItem._id)
            .then((foodResult) => {
                let food = foodResult;
                if (requestItem.name && requestItem.price) {
                    food = requestItem;
                }
                const foodIngredients = food.ingredients;
                const ingredientesCloned = foodIngredients.map((ingredientItem) => {
                        const ingredientCloned = JSON.parse(JSON.stringify(ingredientItem));
                        const { amount, name } = ingredientCloned;
                        switch (name) {
                            case this.MEET_BURGUER:
                                const result = (amount / 3);
                                if (result >= 1){
                                    const newAmount = amount - Math.trunc(result);
                                    ingredientCloned.amount = newAmount;
                                }
                            break;
                            case this.LETTUCE:
                                const bacon = food.ingredients.find((item) => item.name === this.BACON);
                                if (!bacon) {
                                    const rebate = 0.10;
                                    ingredientCloned.rebate = rebate;
                                }
                            break;
                            case this.CHEESE:
                                const result2 = (amount / 3);
                                if ( result2 >= 1) {
                                    const newAmount2 = amount - Math.trunc(result2);
                                    ingredientCloned.amount = newAmount2;
                                }
                            break;
                            default:
                                break;
                        }
                        return ingredientCloned;
                });
                requestItem.ingredients = ingredientesCloned;
                return Promise.resolve(requestListUpdated.push({
                    price: food.price,
                    amount: requestItem.amount,
                    name: food.name,
                    _id: requestItem._id,
                    ingredients: ingredientesCloned,
                }));
        })
    }).then(() => requestListUpdated);
  }

}

export default new RequestService();


