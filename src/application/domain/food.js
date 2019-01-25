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
    },
    ingredients: [
        new Schema(
        {
            name: String,
        },
        {
            price: Number,
        },
        {
            amount: Number,
        }
    )]

}, { timestamps: true});

const model = mongoose.model('Food', schema);
export const FoodSchema = model.schema;
export default model;
