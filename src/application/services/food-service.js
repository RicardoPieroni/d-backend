import FoodDomain from '../domain/food';

class FoodService {
  retrieveAllFoods() {
    return FoodDomain.find()
  }

  retrieveFoodById(id) {
    return FoodDomain.findOne({ _id: id });
  }
}

export default new FoodService();
