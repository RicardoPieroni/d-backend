const mongo = new Mongo();
const db =  mongo.getDB('d-database');
//db.auth('NAME_DATABSE', 'PASSWORD');

function run() {
    db.createCollection('ingredients');
    db.ingredients.insert([
        {
            "name": "Alface",
            "price": 0.40
        },
        {
            "name": "Bacon",
            "price": 2.00
        },
        {
            "name": "Hambúrguer de carne",
            "price": 3.00
        },
        {
            "name": "Ovo",
            "price": 0.80
        },
        {
            "name": "Queijo",
            "price": 1.50
        }
    ]);
}

run();