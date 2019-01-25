const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, { timestamps: true});

const model = mongoose.model('Ingredient', schema);
export const IngredientSchema = model.schema;
export default model;
