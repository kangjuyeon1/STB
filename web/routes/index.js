var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/monitoring', function(req, res, next) {
//   res.render('monitoring');
// });

router.get('/monitoring', function(req, res, next) {
  res.render('monitoring', { activePage: 'monitoring' });
});

router.get('/QR', function(req, res, next) {
  res.render('QR');
});

router.get('/plogging', function(req, res, next) {
  res.render('plogging');
});

router.get('/dispose', function(req, res, next) {
  res.render('dispose');
});

router.get('/weight', function(req, res, next) {
  res.render('weight');
});

router.get('/ranking', function(req, res, next) {
  res.render('ranking');
});


router.get('/checkapi', function(req, res, next) {
  req.io.emit('plogging', { value: 'aku sayang pak hendra' })

  res.json({ user: 'checkget' });
});

router.post('/checkapi', function(req, res, next) {
  res.status(200).send({ value: req.body });
});

// app.get('/monitoring', (req, res) => {
//   res.render('monitoring', { title: 'Monitoring Page' });
// });


module.exports = router;
