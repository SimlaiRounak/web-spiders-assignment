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