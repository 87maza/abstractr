var express  = require('express');
var morgan = require('morgan');
var fs = require('fs');
var favicon = require('serve-favicon');
var port = process.env.PORT || 3000
var app = express();
var mongoose = require('mongoose');
var config = require('./config.js')
app.use(favicon(__dirname + '/android-icon-192x192.png'));

app.use(morgan('short'));

//home route
app.use(express.static('public'));


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.get('/api/results', function(req,res){
    res.send('search results page');
})

app.get('/api/history', function(req,res){
    res.send('history page');
})



app.listen(port, function(){
	console.log('runnin on ' + port)
});

