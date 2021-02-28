var datastore = require('nedb');
var db = new datastore({ filename: 'database.json', autoload: true });

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');
// var submittedData = [];


app.get('/', function(req, res) {
    res.send('hello there!')
});

// app.post('/', function(req, res) {
//     res.send('hello there!')
// });

app.get('/formdata', function(req, res) {
    db.find({}, function(err, docs) {

        var dataWrapper = { data: docs };
        res.render("template.ejs", dataWrapper);

    })

})

app.get('/displayrecord', function(req, res) {
    db.find({ _id: req.query._id }, function(err, docs) {
        var dataWrapper = { data: docs[0] };
        res.render("individual.ejs", dataWrapper); // open new page?
    });

})

app.get('/search', function(req, res) {
    //
    console.log("Search for: " + req.query.q);
    var query = new RegExp(req.query.q, 'i');
    db.find({ text: query }, function(err, docs) {
        var dataWrapper = { data: docs };
        res.render("template.ejs", dataWrapper);
    })


})


app.post('/formdata', function(req, res) {
    console.log(req.body.data);

    var dataToSave = {
        text: req.body.data,
        color: req.body.color,
        longtext: req.body.longtext
    };

    var output = "";

    // NEED TO DO SOMETHING
    // ADDING DIV FOR ENTRY!

    // for (var i = 0; i < submittedData.length; i++) {
    //     output += "<h2 style ='color: " + submittedData[i].color + "'>" + submittedData[i].text + "</h2>";
    //     output += "<div style ='color: " + submittedData[i].color + "'>" + submittedData[i].longtext + "</div>";
    // }

    // res.send(output);

    // ADDING DIV FOR ENTRY END

    db.insert(dataToSave, function(err, newDoc) {
        // res.send("Data Saved:" + newDoc);
        // callback for errors
        db.find({}, function(err, docs) {

            var dataWrapper = { data: docs };
            res.render("template.ejs", dataWrapper);

        })
    });


    // submittedData.push(dataToSave);

    // console.log(submittedData);



})

app.listen(3001, function() {
    console.log('example app listening on port 3001!')
});