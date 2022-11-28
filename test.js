var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://ROOT:LODfQLo6oHJAzhR3@cluster0.414dubm.mongodb.net/test';
var str = "";

app.route('/Employeeid').get(function(req, res)

{
MongoClient.connect(url, function(err, db) {
var cursor = db.collection('Ordenes').find();
//noinspection JSDeprecatedSymbols
cursor.each(function(err, item) {

if (item != null) {
str = str + " - ";
}
});
res.send(str);
db.close();
});
});

var server = app.listen(3000, function() {});