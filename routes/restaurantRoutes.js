/**
 * @file restaurantRoutes.js
 * @description Defines routes for searching restaurants and getting restaurant details.
 *
 * @route GET /restaurants/list
 * @description Search and list restaurants based on query parameters.
 * @access Public
 * @controller searchRestaurants
 *
 * @route GET /restaurants/:id
 * @description Get details of a restaurant by ID.
 * @access Public
 * @controller getRestaurantById
 *
 * @route /restaurants/:id/menu
 * @description Nested routes for restaurant menu operations.
 * @access Public
 * @router menuRoutes
 */

const express = require('express')
const { searchRestaurants, getRestaurantById } = require('../controllers')
const menuRoutes = require('./menuRoutes')
const router = express.Router();

router.get('/list', searchRestaurants);
router.get('/:id', getRestaurantById);

router.use('/:id/menu', menuRoutes);

module.exports = router