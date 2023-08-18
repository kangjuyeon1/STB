var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/monitoring', function(req, res, next) {
  res.render('monitoring');
});

router.get('/plogging', function(req, res, next) {
  res.render('plogging');
});

router.get('/checkapi', function(req, res, next) {
  req.io.emit('plogging', { value: 'aku sayang pak hendra' })

  res.json({ user: 'checkget' });
});

router.post('/checkapi', function(req, res, next) {
  res.status(200).send({ value: req.body });
});

module.exports = router;
