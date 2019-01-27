
import RequestDomain from '../domain/request';
import FoodService from '../services/food-service';
import Promise from 'bluebird';

class RequestService {

  constructor() {
    this.BACON = 'Bacon';
    this.MEET_BURGUER = 'Hambúrguer de carne';
    this.LETTUCE = 'Alface';
    this.CHEESE = 'Queijo';
    this.BREAD = 'Pão'
  }

  /**
 * this route is used to calculate the values of request order
 *
 * requestList RequestList List of foods to generate request (optional)
 * returns request
 **/
  calculateRequest(requestList){

  }

  /**
   * 
   * @param {*} dataTO 
   */
  create(dataTO){

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

  }

  updateStatus(id) {

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


