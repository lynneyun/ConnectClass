// Epxress is a node module for building HTTP servers
var express = require('express');
var app = express();

// tell express to look in the public directory for any files first
app.use(express.static("public"));

// The default route of / and what to do 
app.get("/fractaltree", function(req, res) {
    res.send("<html><body><h1>hello thank you for connecting!</h1></body></html>");
});

app.listen(80);