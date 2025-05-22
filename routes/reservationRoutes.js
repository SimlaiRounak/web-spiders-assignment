const express = require('express')
const { getReservation, addReservation } = require('../controllers')

const router = express.Router();

router.get('/get', getReservation);
router.post('/add', addReservation);

module.exports = router
