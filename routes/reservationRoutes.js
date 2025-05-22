/**
 * @file reservationRoutes.js
 * @description Defines routes for managing restaurant reservations.
 *
 * @route GET /reservations/get
 * @description Retrieve all reservations.
 * @access Public
 * @controller getReservation
 *
 * @route POST /reservations/add
 * @description Create a new reservation.
 * @access Public
 * @controller addReservation
 */

const express = require('express')
const { getReservation, addReservation } = require('../controllers')

const router = express.Router();

router.get('/get', getReservation);
router.post('/add', addReservation);

module.exports = router
