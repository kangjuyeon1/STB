const express = require('express')
const router = express.Router()

router.post('/qr', (req, res) => {
  console.log(req.body)
  req.io.emit('plogging', { value: req.body.qr_value })

  res.status(200).send({ value: req.body });
});

module.exports = router
