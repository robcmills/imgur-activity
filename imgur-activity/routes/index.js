var express = require('express');
var users = require('./users');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', users);

module.exports = router;
