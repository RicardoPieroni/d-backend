import FoodDomain from '../domain/food';

class FoodService {
  retrieveAllFoods() {
    return FoodDomain.find()
  }
}

export default new FoodService();
