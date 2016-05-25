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

// bing translations
// body.d.results[1].MediaUrl = url
// body.d.results[1].title = alt tag/snippet
// body.d.results[1].Thumbnail.MediaUrl = thumbnail
// body.d.results[1].SourceUrl = context


    Bing.images("Ninja Turtles", {skip: 20, top: 10}, function(error, res, body){
      results = {
        url : body.d.results[2].MediaUrl,
        snippet: body.d.results[2].Title,
        thumbnail: body.d.results[2].Thumbnail.MediaUrl,
        context: body.d.results[2].SourceUrl
      } 
      function getit(y){
    app.get('/api/results', function(req,res){
    res.json(results);

    })
    }
    getit(results);

    });




app.use(favicon(__dirname + '/android-icon-192x192.png'));

app.use(morgan('short'));

//home route
app.use(express.static('public'));


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.get('/api/history', function(req,res){

res.send('fuck')
    
})





app.listen(port, function(){
	console.log('runnin on ' + port)
});

