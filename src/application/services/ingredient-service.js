import IngredientDomain from '../domain/ingredient';


class IngredientService {
  retrieveAllIngredients() {
    return IngredientDomain.find();
  }

  retrieveIngredientById(id) {
    return IngredientDomain.findOne({ _id: id });
  }
}

export default new IngredientService();

