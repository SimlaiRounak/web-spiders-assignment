const { Schema, default: mongoose } = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const menuItemSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    isVeg: {
        type: Boolean,
        required: true,
    },
    ingredients: [String],
    allergens: [String],
    specialTags: [String],
    imageURL: String,
})

const tableSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    tableNumber: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    }
})

const restaurantSchema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    cuisine: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0,
    },
    priceRange: {
        type: String,
        enum: ['$', '$$', '$$$'],
        trim: true,
        default: '$'
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    operatingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        wednesday: { open: String, close: String },
        thursday: { open: String, close: String },
        friday: { open: String, close: String },
        saturday: { open: String, close: String },
        sunday: { open: String, close: String }
    },
    menu: [menuItemSchema],
    tables: [tableSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

restaurantSchema.index({ cuisine: 1 })
restaurantSchema.index({ location: 1 })
restaurantSchema.index({ rating: 1 })

restaurantSchema.plugin(AutoIncrement, { inc_field: '_id' })

module.exports = mongoose.model('Restaurant', restaurantSchema)