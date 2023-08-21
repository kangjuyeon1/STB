var express = require('express');
const Users = require('../models/Users');
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

router.get('/ranking', async function(req, res, next) {
  let sortedUsers = await Users.find()
    .sort({ weight: -1 }) // 1 for ascending order, -1 for descending order
    .exec();
  res.render('ranking', { sortedUsers: sortedUsers});
});

router.get('/checkApi', function(req, res, next) {
  res.json({ "lol": "ok" });
});

module.exports = router;
