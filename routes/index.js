/**
 * @file indexRoutes.js
 * @description Main API router that provides a welcome message and mounts restaurant and reservation routes.
 *
 * @route GET /
 * @description Welcome message and overview of available endpoints.
 * @access Public
 *
 * @route /restaurants
 * @description Routes for restaurant-related operations.
 * @access Public
 * @router restaurantRouter
 *
 * @route /reservations
 * @description Routes for reservation-related operations.
 * @access Public
 * @router reservationRouter
 */
const express = require('express')
const restaurantRouter = require('./restaurantRoutes')
const reservationRouter = require('./reservationRoutes')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the restaurant API',
        endpoints: {
            restaurants: '/restaurants/list',
            menus: 'restaurants/:id/menu',
            categories: 'restaurants/:id/menu/categories',
            reservations: '/reservations'
        }
    })
});

router.use('/restaurants', restaurantRouter)
router.use('/reservations', reservationRouter)

module.exports = router