var express = require('express');
var router = express.Router();

var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp     = require('pg-promise')(options);

var connectionString = 'postgres://localhost:5432/users';
var db               = pgp(connectionString);

//* Parse the user id
router.param('id', function (req, res, next, id) {
  req.userId = parseInt(id);
  next();
});

/* GET all users. */
router.get('/', function(req, res, next){
  db.any('SELECT * FROM users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

/* GET a single user. */
router.get('/:id', function(req, res, next) {
  db.one('SELECT * FROM users WHERE id = $1', req.userId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

/* Post a single user */
router.post('/', function(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO users(name, email, age, sex)' + 'values(${name}, ${email}, ${age}, ${sex})', req.body)
    .then(function () {
      res.status(201)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

/* PUT a single user */
router.put('/:id', function(req, res, next){
  db.none('UPDATE users SET name=$1, email=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.email, parseInt(req.body.age), req.body.sex, req.userId])
  .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
  })
  .catch(function (err) {
    return next(err);
  });
});

router.delete('/:id', function() {
  db.none('DELETE users WHERE id=$1', req.userId)
    .then(function () {
      res.status(200)
        .json({
          status: 'success'
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
