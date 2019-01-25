import { Factory } from 'rosie';
import Chance from 'chance';

const chanceInstance = new Chance();
const ingredientFactory = new Factory()
    .attrs({
        _id: () => chanceInstance.string({ length: 24, pool: '0123456789' }),
        name: () => chanceInstance.word(),
        price: () => chanceInstance.floating({ min:0, max: 10 }),
        amount: () => chanceInstance.integer({ min: 1, max: 4 })
    }).attr('ingredientId', ['_id'], _id => _id);

export default ingredientFactory;
