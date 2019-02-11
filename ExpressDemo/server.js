var express = require('express');
var app = express();
var port = 3000;
var path = require('path');
var CoinRouter = require('./routes/CoinRouter');
var mongooes = require('mongoose');
var bodyParser = require('body-parser');


mongooes.Promise = global.Promise;
mongooes.connect('mongodb://localhost/ExpressDemo', function (err, db) {
    if (err) throw err;
    console.log('Database created!');
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/coins', CoinRouter);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
    console.log('Node js Express js Tutorial');
});