// server.js
// where your node app starts

// init project
var express = require('express');
var multer  = require('multer');
var fs = require('fs');

var storage = multer.memoryStorage();
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body

app.post("/api/filesize", function (request, response) {
  var upload = multer({ storage : storage}).single('filetomeasure');
  upload(request,response,function(err) {
        if(err) {
            return response.end("Error uploading file.");
        }
        response.json({size: request.file.size});
        response.end();
    });
});

// Simple in-memory store for now
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
