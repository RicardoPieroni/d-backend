import { Factory } from 'rosie';
import Chance from 'chance';
import moment from 'moment'

const chanceInstance = new Chance();
const requestFactory = new Factory()
    .attrs({
        _id: () => chanceInstance.string({ length: 24, pool: '0123456789' }),
        price: () => chanceInstance.floating({ min:0, max: 10 }),
        number: () => chanceInstance.integer({ min: 1, max: 4 }),
        status: () => 'ativo',
        requestDate: () => moment().toDate(),

    }).attr('requestId', ['_id'], _id => _id);

export default requestFactory;
