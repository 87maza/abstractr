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
var Searches = require('./searchModel.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/android-icon-192x192.png'));

app.use(morgan('short'));

//home route assets inside public folder
app.use(express.static('public'));


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.get('/api/results', function(req,res){
//function to generate proper URL queries and offsets
    var offset = req.query.offset || 0;
    var newSearch = new Searches();
      newSearch.term = req.query.search;
      newSearch.when = new Date();
      newSearch.save(function(err) {
        if (err)
          throw err;
      });
    Bing.images(req.query.search, {skip: offset, top: 10}, function(error, response, body){
        //search Bing, response is not really used
      var results = {};
        for(var i=0; i<body.d.results.length; i++){
            results["result" + (i+1)] = {
                url : body.d.results[i].MediaUrl,
                snippet: body.d.results[i].Title,
                thumbnail: body.d.results[i].Thumbnail.MediaUrl,
                context: body.d.results[i].SourceUrl
            }
        }
        res.json(results);
    });
})

function clearCache(hist){
    if (hist.length > 8) {
        Searches.findOneAndRemove({}, function(err) {
          if (err)
            throw err;
        })
    }
}

app.get('/api/history', function(req,res){
    Searches.find({}, function (err, history) {
        //find and iterate through the history array of objects, send them a json obj limit at top 15
        if (err) return err;
        else {
            history = history.reverse().map(function(e) {
                return { 
                    term: e.term, 
                    when: e.when 
                };
            })
            res.json(history.slice(0,15));
        }
    })
});


app.listen(port, function(){
	console.log('runnin on ' + port)
});

