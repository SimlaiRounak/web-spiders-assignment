/**
 * Restaurant Model - Mongoose schema representing restaurants, including menus and table data.
 *
 * Subschemas:
 * @subschema menuItemSchema
 *   @field {Number} _id - Auto-incremented ID for the menu item.
 *   @field {String} name - Name of the menu item.
 *   @field {String} category - Category (e.g., starter, main course).
 *   @field {String} description - Description of the menu item.
 *   @field {String} price - Price (stored as string for currency formatting).
 *   @field {Boolean} isAvailable - Availability status of the item.
 *   @field {Boolean} isVeg - Whether the item is vegetarian.
 *   @field {String[]} ingredients - List of ingredients used.
 *   @field {String[]} allergens - List of allergens present.
 *   @field {String[]} specialTags - Tags like "spicy", "gluten-free".
 *   @field {String} imageURL - Optional image URL.
 *
 * @subschema tableSchema
 *   @field {Number} _id - Auto-incremented ID for the table.
 *   @field {String} tableNumber - Unique table number.
 *   @field {Number} capacity - Seating capacity of the table.
 *   @field {String} location - Location in the restaurant.
 *   @field {Boolean} isActive - Whether the table is available.
 *
 * Main Schema:
 * @field {Number} _id - Auto-incremented restaurant ID.
 * @field {String} name - Restaurant name.
 * @field {String} cuisine - Type of cuisine offered.
 * @field {String} location - Geographical location or city.
 * @field {Number} rating - Restaurant rating (0–5).
 * @field {String} priceRange - Price category: $, $$, $$$.
 * @field {String} contactNumber - Phone number.
 * @field {String} address - Street address.
 * @field {Object} operatingHours - Opening and closing times for each day.
 * @field {menuItemSchema[]} menu - Embedded array of menu items.
 * @field {tableSchema[]} tables - Embedded array of tables.
 * @field {Date} createdAt - Timestamp for creation (default: now).
 *
 * Indexes:
 * - cuisine
 * - location
 * - rating
 *
 * Plugins:
 * @plugin AutoIncrement - Auto-increments _id field for the restaurant.
 */

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