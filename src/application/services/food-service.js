import FoodDomain from '../domain/food';
import { ObjectID } from 'mongodb';

class FoodService {
  retrieveAllFoods() {
    return FoodDomain.find()
  }

  retrieveFoodById(id) {
    return FoodDomain.findOne({ _id: new ObjectID(id) });
  }
}

export default new FoodService();
