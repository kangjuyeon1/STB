var express = require('express');
var router = express.Router();

// POST /data route handle
router.post('/data', (req, res) => {
  const sensorValue = req.body.sensor_value;
  console.log(`\nReceived sensor value: ${sensorValue}`);

  res.status(200).send({ sensor_value: sensorValue });
});

module.exports = router;
