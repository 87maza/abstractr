var express  = require('express');
var morgan = require('morgan');
var fs = require('fs');
var favicon = require('serve-favicon');
var port = process.env.PORT || 3000
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config.js');
var Bing = require('node-bing-api')({ accKey: "HUbThdlOtDm9tcc33MaX9Jei8H8Vv7TU2FurPoCwHXI" });

app.use(favicon(__dirname + '/android-icon-192x192.png'));

app.use(morgan('short'));

//home route assets inside public folder
app.use(express.static('public'));


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


Bing.images("Ninja Turtles", {skip: 20, top: 10}, function(error, res, body){
  var results = {};
    for(var i=0; i<body.d.results.length; i++){
        results["result" + (i+1)] = {
            url : body.d.results[i].MediaUrl,
            snippet: body.d.results[i].Title,
            thumbnail: body.d.results[i].Thumbnail.MediaUrl,
            context: body.d.results[i].SourceUrl
        }
    }
  function getit(y){
    app.get('/api/results', function(req,res){
    res.json(y);
    })
  }
  getit(results);

});


app.get('/api/history', function(req,res){

res.send('fuck')
    
})





app.listen(port, function(){
	console.log('runnin on ' + port)
});

