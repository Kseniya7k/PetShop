const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const USER = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;
(async () => {
    const client = await MongoClient.connect(`mongodb://${USER}:${PASSWORD}@${MONGO_URL}/?authSource=admin`);
    require('./routes')(app, client);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})();

