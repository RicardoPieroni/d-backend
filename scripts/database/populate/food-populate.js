const mongo = new Mongo();
const db =  mongo.getDB('d-database');
//db.auth('NAME_DATABSE', 'PASSWORD');

function run() {
    db.createCollection('foods');
    db.foods.insert([
        {
            "name": "X-bacon",
            "price": 6.50,
            "ingredients" : [
                {
                    "_id": "000000000000000000000002",
                    "name": "Bacon",
                    "price": 2.00,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000003",
                    "name": "Hambúrguer de carne",
                    "price": 3.00,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000005",
                    "name": "Queijo",
                    "price": 1.50,
                    "amount": 1
                }
            ]
        },
        {
            "name": "X-burger",
            "price": 4.50,
            "ingredients" : [
                {
                    "_id": "000000000000000000000003",
                    "name": "Hambúrguer de carne",
                    "price": 3.00,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000005",
                    "name": "Queijo",
                    "price": 1.50,
                    "amount": 1
                }
            ]
        },
        {
            "name": "X-egg",
            "price": 5.30,
            "ingredients" : [
                {
                    "_id": "000000000000000000000003",
                    "name": "Hambúrguer de carne",
                    "price": 3.00,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000005",
                    "name": "Queijo",
                    "price": 1.50,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000004",
                    "name": "Ovo",
                    "price": 0.80,
                    "amount": 1
                }
            ]
        },
        {
            "name": "X-egg Bacon",
            "price": 7.30,
            "ingredients" : [
                {
                    "_id": "000000000000000000000003",
                    "name": "Hambúrguer de carne",
                    "price": 3.00,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000005",
                    "name": "Queijo",
                    "price": 1.50,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000004",
                    "name": "Ovo",
                    "price": 0.80,
                    "amount": 1
                },
                {
                    "_id": "000000000000000000000002",
                    "name": "Bacon",
                    "price": 2.00,
                    "amount": 1
                }
            ]
        }
    ]);
}

run();