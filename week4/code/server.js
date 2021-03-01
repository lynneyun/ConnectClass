var datastore = require('nedb');
var db = new datastore({ filename: 'database.json', autoload: true });

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

// app.set('view engine', 'ejs');

app.get('/formdata', function(req, res) {
    db.find({}, function(err, docs) {

        // var dataWrapper = { data: docs };
        // res.send(dataWrapper); //???
        res.send(docs);

    })

})


app.post('/formdata', function(req, res) {
    // console.log("req.body.text: " + req.body.text);

    var dataToSave = {
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    };
    // var output = "";


    db.insert(dataToSave, function(err, newDoc) {
        // res.send("Data Saved:" + newDoc);
        // callback for errors
        db.find({}, function(err, docs) {

            // var dataWrapper = { data: docs };
            // res.render("template.ejs", dataWrapper);

            res.send(docs);

        })
    });


})

app.listen(3000, function() {
    console.log('example app listening on port 3000!')
});