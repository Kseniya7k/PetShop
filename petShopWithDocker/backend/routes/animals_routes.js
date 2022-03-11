const bodyParser = require('body-parser')
const {ObjectId} = require("mongodb");
const jsonParser = bodyParser.json();

const DATA_BASE = process.env.MONGO_DATABASE;

module.exports = function (app, client) {
    const db = client.db(DATA_BASE);

    app.use(((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }));

    app.post('/animals', jsonParser, async (req, res) => {
        const animal = {
            name: req.body.name,
            type: req.body.type,
            sex: req.body.sex,
            color: req.body.color,
            age: req.body.age,
            family: req.body.family,
            uniqueAbilities: req.body.uniqueAbilities
        };
        db.collection('animals').insertOne(animal, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(animal);
            }
        });
    });

    app.get('/animals', async (req, res) => {
        const animals = await db.collection('animals').find().toArray();
        res.send(animals);
    });

    app.get('/animals/:id', async (req, res) => {
        const animal = await db.collection('animals').findOne({_id: ObjectId(req.params.id)});
        res.send(animal);
    });

    app.put('/animals/:id', jsonParser, (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectId(id) };
        const animal = {
            name: req.body.name,
            type: req.body.type,
            sex: req.body.sex,
            color: req.body.color,
            age: req.body.age,
            family: req.body.family,
            uniqueAbilities: req.body.uniqueAbilities
        };
        db.collection('animals').updateOne(details, { $set: animal }, (err, result) => {
            console.log({result})
            if (err) {
                res.status(500).send({ error:'An error has occurred' });
            } else {
                res.send(animal);
            }
        });
    });

    app.delete('/animals/:id', (req, res) => {
        const id = req.params.id;
        const details = { _id: new ObjectId(id) };
        db.collection('animals').deleteOne(details, (err, result) => {
            console.log({result});
            if (err) {
                res.status(500).send({ error:'An error has occurred' });
            } else {
                res.status(204).send();
            }
        })
    })
};