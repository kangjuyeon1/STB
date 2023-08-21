const express = require('express');
const Users = require('../models/Users');
const { default: mongoose } = require('mongoose');
const router = express.Router()

// checking qr
router.post('/checkQr', async (req, res) => {
  const allUsers = await Users.find()
  const qrcode = allUsers[0]._id.toString()

  if(req.body.qr_value == qrcode) {
    console.log("this is actually yours!: " + qrcode)
    req.io.emit('checkQr', { value: true, qrcode: qrcode})
    res.status(200).send({ 
      value: allUsers,
      msg: "ok"
    });
  } else {
    req.io.emit('checkQr', { value: false, qrcode: null})
    res.status(500).send({ 
      msg: "notok"
    });
  }
});

// disposal process
router.post('/dispose', async (req, res) => {
  console.log(req.body)
  totalWeight = req.body.currentWeight - req.body.initialWeight
  let user = await Users.updateOne({_id: req.body.qrcode}, {
    $inc: { weight: totalWeight }
  })
  res.status(200).json(user)
})

module.exports = router
