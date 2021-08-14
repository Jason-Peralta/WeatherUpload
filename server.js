// server.js
const express = require('express');
const bodyParser= require('body-parser')
const {mongoS} = require("./private");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionString = mongoS;
const csvtojson = require("csvtojson");



app.listen(3000, function() {
    console.log('Listening On 3000')
})

csvtojson()
    .fromFile("csvs/KSEA.csv")
    .then(csvData => {
        console.log(csvData);

        MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true },
            (err, client) => {
                if (err) throw err;

                client
                    .db("weather")
                    .collection("KSEA")
                    .insertMany(csvData, (err, res) => {
                        if (err) throw err;

                        console.log(`Inserted: ${res.insertedCount} rows`);
                        client.close();
                    });
            }
        );
    });
