const { Restaurant, Reservation } = require("../models");
const { calculateEndTime, isValidISODate } = require('../utils/timeUtils');

/**
 * Controller function to fetch the reservations of a restaurant by ID
 * 
 * @param {Object} req - Express request object containing restaurant ID in query
 * @param {Object} res - Express response object used to return reservations
 * @returns {JSON} Restaurant reservations array or appropriate error message
 */

const getReservation = async (req, res) => {
    try {
        const { restaurantId, date } = req.query

        if (!restaurantId) {
            return res.status(400).json('restaurantId is required')
        }

        const query = { restaurantId: parseInt(restaurantId) }

        if (date && isValidISODate) {
            const searchDate = new Date(date)
            const nextDay = newDate(searchDate)
            nextDay.setDate(nextDay.getDate() + 1)

            query.reservationTime = {
                $gte: searchDate,
                $lt: nextDay
            }
        }

        const reservations = await Reservation.find(query).sort({ reservationTime: 1 })

        return res.status(200).json({ reservations })

    } catch (e) {
        return res.status(500).json({
            message: 'Something went wrong !'
        })
    }
}

/**
 * Controller function to create a reservation of a restaurant
 * 
 * @param {Object} req - Express request object containing details of reservation in body
 * @param {Object} res - Express response object used to return confirmation or failure due to conflict of reservation
 * @returns {JSON} Confirmation / Failure due to conflict of reservation, or appropriate error message
 */

const addReservation = async (req, res) => {
    try {
        const { restaurantId, tableId, reservationTime, customerName, customerPhone, numberOfGuests, specialRequests } = req.body;


        if (!restaurantId || !tableId || !reservationTime || !customerName || !customerPhone || !numberOfGuests) {
            return res.status(400).json({
                error: 'Missing required fields',
                requiredFields: ['restaurantId', 'tableId', 'reservationTime', 'customerName', 'customerPhone', 'numberOfGuests']
            });
        }


        if (!isValidISODate(reservationTime)) {
            return res.status(400).json({
                error: 'Invalid reservationTime format. Must be a valid ISO string'
            });
        }


        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        const table = restaurant.tables.find(t => t.tableNumber === tableId);

        if (!table) {
            return res.status(404).json({ error: 'Table not found in this restaurant' });
        }

        if (!table.isActive) {
            return res.status(400).json({ error: 'This table is not currently available for reservations' });
        }


        const reservationStart = new Date(reservationTime);
        const reservationEnd = calculateEndTime(reservationStart);


        const conflictingReservation = await Reservation.findOne({
            restaurantId,
            tableId,
            $or: [
                {
                    reservationStartTime: { $lte: reservationStart },
                    reservationEndTime: { $gt: reservationStart }
                },
                {
                    reservationStartTime: { $lt: reservationEnd },
                    reservationEndTime: { $gte: reservationEnd }
                },
                {
                    reservationStartTime: { $gte: reservationStart },
                    reservationEndTime: { $lte: reservationEnd }
                }
            ]
        });


        if (conflictingReservation) {
            return res.status(409).json({
                error: 'Table already reserved during this time slot',
                conflictingReservation: {
                    id: conflictingReservation._id,
                    start: conflictingReservation.reservationStartTime,
                    end: conflictingReservation.reservationEndTime
                }
            });
        }
        const newReservation = new Reservation({
            restaurantId,
            tableId,
            reservationStartTime: reservationStart,
            reservationEndTime: reservationEnd,
            customerName,
            customerPhone,
            guestCount: numberOfGuests,
            specialRequests
        });


        const savedReservation = await newReservation.save();


        return res.status(201).json({
            message: 'Reservation created successfully',
            reservation: savedReservation
        });

    } catch (error) {
        console.error('Reservation creation error:', error);
        return res.status(500).json({ error: 'Failed to create reservation' });
    }
}


module.exports = {
    getReservation,
    addReservation
}