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