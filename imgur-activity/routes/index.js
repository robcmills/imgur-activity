
var express = require('express');
var api = require('./api');
// var users = require('./users');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/api', api);
// router.use('/users', users);

module.exports = router;
