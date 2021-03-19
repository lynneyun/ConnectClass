//p5 to database

var datastore = require('nedb');
var db = new datastore({ filename: 'database.json', autoload: true });

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonBodyparser = bodyParser.json({ limit: "1000kb" });

// var cors = require('cors');
// app.use(cors());

app.use(express.static('.'))

app.use(jsonBodyparser);

app.get('/data', function(req, res) {
    db.find({}, function(err, docs) {
        res.send(docs);
    })
})

app.post('/save', function(req, res) {
    // console.log(req.body);
    db.insert(req.body, function(err, newDocs) {
        console.log(newDocs);
        res.send({});
    })
});

app.listen(3000, function() {
    console.log('example app listening on port 3000!')
});