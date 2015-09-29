// Dependencies
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Select Connection
var db = mongojs('library');
var books = db.collection('books');

// Endpoints

// CREATE
app.post('/books', function(req, res) {
	books.insert(req.body, function(err, book) {
		 console.log("created", err, book);
		 res.json(book);
	});
});

// READ
app.get('/books', function(req, res) {
  console.log('req.query: ', req.query);
  Sighting.find(req.query)
  .exec(function(err, result) {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// UPDATE
app.put('/books/:id', function(req, res) {
  Sighting.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// DELETE
app.delete('/books/:id', function(req, res) {
  Sighting.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// API Connection
var port = 3000;

app.listen(port, function() {
  console.log('Listening on port ', port);
});
