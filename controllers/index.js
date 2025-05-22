const MenuController = require('./MenuController')
const ReservationController = require('./ReservationController')
const RestaurantController = require('./RestaurantController')

module.exports = {
    ...MenuController,
    ...ReservationController,
    ...RestaurantController
}