/**
 * Reservation Model - Mongoose schema for storing table reservation details.
 *
 * Fields:
 * @field {Number} _id - Auto-incremented reservation ID (using mongoose-sequence).
 * @field {Number} restaurantId - Reference ID to the associated restaurant.
 * @field {String} tableId - ID of the table reserved (subdocument inside Restaurant).
 * @field {Date} reservationStartTime - ISO-formatted start time of the reservation.
 * @field {Date} reservationEndTime - ISO-formatted end time of the reservation.
 * @field {String} customerName - Full name of the customer making the reservation.
 * @field {String} customerPhone - Contact phone number of the customer.
 * @field {Number} guestCount - Number of guests included in the reservation.
 * @field {Date} createdAt - Timestamp when the reservation was created (default: now).
 *
 * Plugins:
 * @plugin AutoIncrement - Adds auto-incrementing numeric ID for each reservation.
 */

const { Schema, default: mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const reservationSchema = new Schema({
    _id: {
        type: Number,
    },
    restaurantId: {
        type: Number,
        required: true,
        ref: 'Restaurant'
    },
    tableId: {
        type: String,
        required: true,
    },
    reservationStartTime: {
        type: Date,
        required: true
    },
    reservationEndTime: {
        type: Date,
        required: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true,
        trim: true
    },
    guestCount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

reservationSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'reservation_counter_id' })

module.exports = mongoose.model('Reservation', reservationSchema)