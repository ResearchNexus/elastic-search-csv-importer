'use strict';

const elasticsearch = require('elasticsearch');
const fs = require('fs');
const csv = require('csv-parser');
const parseArgs = require('minimist');

const config = require('./config');

const ES_INDEX = 'test_team';
const argv = parseArgs(process.argv.slice(2));

const file = argv.f || argv.file;

if(!file) {
    throw 'No file specified. Usage: node index.js --file file.csv';
}

const client = new elasticsearch.Client(config.es);

const addDocument = (data) => {
    return client.create({
        index: ES_INDEX,
        type: 'person',
        id: data.id,
        body: data
    }).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.error(err);
    });
};

fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => {
        addDocument(data);
    });
