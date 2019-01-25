import IngredientDomain from '../domain/ingredient';


class IngredientService {
  retrieveAllIngredients() {
    return IngredientDomain.find();
  }
}

export default new IngredientService();

