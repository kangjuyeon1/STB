var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/monitoring', function(req, res, next) {
  res.render('monitoring');
});

router.get('/checkapi', function(req, res, next) {
  res.json({ user: 'tj' });
});

module.exports = router;
