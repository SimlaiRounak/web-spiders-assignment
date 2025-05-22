const express = require('express')
const { searchRestaurants, getRestaurantById } = require('../controllers')
const menuRoutes = require('./menuRoutes')
const router = express.Router();

router.get('/list', searchRestaurants);
router.get('/:id', getRestaurantById);

router.use('/:id/menu', menuRoutes);

module.exports = router