const  mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Ingredients = new Schema({
    name : String,
    price : Number,
    amount : Number
});

const schema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    ingredients: [Ingredients],

}, { timestamps: true});

const model = mongoose.model('Food', schema);
export const FoodSchema = model.schema;
export default model;
