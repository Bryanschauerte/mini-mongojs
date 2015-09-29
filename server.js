// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

// Mongo
var db = mongojs('library');
var Book = db.collection('books');

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoints -- CRUD

// CREATE
app.post('/books', function(req, res) {
  Book.insert(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// READ
app.get('/books', function(req, res) {
  Book.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// UPDATE
app.put('/books/:id', function(req, res) {
  Book.update({title: mongojs.ObjectId(req.params.id)}, req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// DELETE
app.delete('/books', function(req, res) {
  Book.remove(req.query, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Connection
app.listen(3000, function() {
  console.log('listening on port 3000');
});

// API Connection
var port = 3000;

app.listen(port, function() {
  console.log('Listening on port ', port);
});
