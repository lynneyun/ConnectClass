var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

var submittedData = [];


app.post('/', function(req, res) {
    res.send('hello there!')
});

app.post('/formdata', function(req, res) {
    console.log(req.body.data);

    var dataToSave = {
        text: req.body.data,
        color: req.body.color
    };


    submittedData.push(dataToSave);

    console.log(submittedData);

    var output = "";


    for (var i = 0; i < submittedData.length; i++) {
        output += "<div style ='color: " + submittedData[i].color + "'>" + submittedData[i].text + "</div>";
    }

    res.send(output);

})

app.listen(3000, function() {
    console.log('example app listening on port 3000!')
});