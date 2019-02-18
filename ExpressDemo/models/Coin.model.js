var mongooes = require('mongoose');
var Schema = mongooes.Schema;

var Coin = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
},{
    collection: 'coins'
});

module.exports = mongooes.model('Coin', Coin);