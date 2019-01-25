const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    price: Number,
    number: Number,
    requestDate: Date,
    status: String,
    requestList: [
        new Schema(
            {
                name: String
            },
            {
                price: Number
            }, 
            {
                amount: Number
            },
            {
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
            }
        )
    ]    
        

}, { timestamps: true});

const model = mongoose.model('Request', schema);
export const RequestSchema = model.schema;
export default model;
