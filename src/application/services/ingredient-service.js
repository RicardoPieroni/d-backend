import IngredientDomain from '../domain/ingredient';
import { ObjectID } from 'mongodb';

class IngredientService {
  retrieveAllIngredients() {
    return IngredientDomain.find();
  }

  retrieveIngredientById(id) {
    return IngredientDomain.findOne({ _id: new ObjectID(id) });
  }
}

export default new IngredientService();

