const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ingredients = new Schema({
    name : String,
    price : Number,
    amount : Number
});

const Foods = new Schema({
        name: String,
        price: Number,
        amount: Number,
        ingredients: [Ingredients],
});

const schema = new Schema({
    price: Number,
    number: Number,
    requestDate: Date,
    status: String,
    requestList: [
        Foods   
    ] 
        

}, { timestamps: true});

const model = mongoose.model('Request', schema);
export const RequestSchema = model.schema;
export default model;
