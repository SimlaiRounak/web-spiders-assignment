const mongoose = require('mongoose')
const Restaurant = require('../models/Restaurant')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (e) {
        console.error(err)
    }
}

const seedData = async () => {
    const count = await Restaurant.countDocuments()
    if (count > 0) {
        return
    }
    const sampleData = [
        {
            _id: 1,
            name: 'Spice Garden',
            cuisine: 'Indian',
            location: 'Kolkata',
            rating: 4.5,
            priceRange: '$$',
            contactNumber: '+91 98765 43210',
            address: '123 Curry Lane, Kolkata',
            operatingHours: {
                monday: { open: '11:00', close: '22:00' },
                tuesday: { open: '11:00', close: '22:00' },
                wednesday: { open: '11:00', close: '22:00' },
                thursday: { open: '11:00', close: '22:00' },
                friday: { open: '11:00', close: '23:00' },
                saturday: { open: '12:00', close: '23:00' },
                sunday: { open: '12:00', close: '22:00' }
            },
            menu: [
                { _id: 1, category: "starter", name: "Samosa", description: "Crispy pastry with spiced potatoes", price: 4.99, isVeg: true, isAvailable: true },
                { _id: 2, category: "starter", name: "Papadum", description: "Thin, crisp, disc-shaped food", price: 2.99, isVeg: true, isAvailable: true },
                { _id: 3, category: "main", name: "Butter Chicken", description: "Creamy tomato curry with chicken", price: 14.99, isVeg: false, isAvailable: true },
                { _id: 4, category: "main", name: "Vegetable Biryani", description: "Spiced rice with vegetables", price: 12.99, isVeg: true, isAvailable: false },
                { _id: 5, category: "dessert", name: "Gulab Jamun", description: "Sweet milk solid balls", price: 5.99, isVeg: true, isAvailable: true }
            ],
            tables: [
                { _id: 1, tableNumber: "A1", capacity: 2, location: "indoor", isActive: true },
                { _id: 2, tableNumber: "A2", capacity: 2, location: "indoor", isActive: true },
                { _id: 3, tableNumber: "B1", capacity: 4, location: "indoor", isActive: true },
                { _id: 4, tableNumber: "C1", capacity: 6, location: "indoor", isActive: true },
                { _id: 5, tableNumber: "D1", capacity: 8, location: "private", isActive: true }
            ]
        },
        {
            _id: 2,
            name: 'Pasta Paradise',
            cuisine: 'Italian',
            location: 'Kolkata',
            rating: 4.2,
            priceRange: '$$$',
            contactNumber: '+91 98765 12345',
            address: '456 Pizza Street, Kolkata',
            operatingHours: {
                monday: { open: '12:00', close: '22:00' },
                tuesday: { open: '12:00', close: '22:00' },
                wednesday: { open: '12:00', close: '22:00' },
                thursday: { open: '12:00', close: '22:00' },
                friday: { open: '12:00', close: '23:30' },
                saturday: { open: '12:00', close: '23:30' },
                sunday: { open: '12:00', close: '22:00' }
            },
            menu: [
                { _id: 1, category: "starter", name: "Bruschetta", description: "Toasted bread with tomatoes", price: 6.99, isVeg: true, isAvailable: true },
                { _id: 2, category: "starter", name: "Calamari", description: "Fried squid rings", price: 8.99, isVeg: false, isAvailable: false },
                { _id: 3, category: "main", name: "Spaghetti Carbonara", description: "Pasta with egg and pancetta", price: 13.99, isVeg: false, isAvailable: true },
                { _id: 4, category: "main", name: "Margherita Pizza", description: "Classic tomato and mozzarella pizza", price: 11.99, isVeg: true, isAvailable: true },
                { _id: 5, category: "dessert", name: "Tiramisu", description: "Coffee-flavored Italian dessert", price: 7.99, isVeg: true, isAvailable: true }
            ],
            tables: [
                { _id: 1, tableNumber: "T1", capacity: 2, location: "outdoor", isActive: true },
                { _id: 2, tableNumber: "T2", capacity: 2, location: "outdoor", isActive: true },
                { _id: 3, tableNumber: "T3", capacity: 4, location: "indoor", isActive: true },
                { _id: 4, tableNumber: "T4", capacity: 4, location: "indoor", isActive: true },
                { _id: 5, tableNumber: "T5", capacity: 6, location: "indoor", isActive: true }
            ]
        },
        {
            _id: 3,
            name: 'Bangkok Bistro',
            cuisine: 'Thai',
            location: 'Howrah',
            rating: 4.0,
            priceRange: '$$',
            contactNumber: '+91 99988 77766',
            address: '789 Spice Road, Howrah',
            operatingHours: {
                monday: { open: '11:30', close: '22:00' },
                tuesday: { open: '11:30', close: '22:00' },
                wednesday: { open: '11:30', close: '22:00' },
                thursday: { open: '11:30', close: '22:00' },
                friday: { open: '11:30', close: '23:00' },
                saturday: { open: '12:30', close: '23:00' },
                sunday: { open: '12:30', close: '22:00' }
            },
            menu: [
                { _id: 1, category: "starter", name: "Spring Rolls", description: "Crispy rolls with vegetables", price: 5.99, isVeg: true, isAvailable: true },
                { _id: 2, category: "starter", name: "Tom Yum Soup", description: "Spicy and sour soup", price: 6.99, isVeg: true, isAvailable: true },
                { _id: 3, category: "main", name: "Pad Thai", description: "Stir-fried rice noodles with eggs", price: 12.99, isVeg: true, isAvailable: true },
                { _id: 4, category: "main", name: "Green Curry", description: "Spicy curry with coconut milk", price: 13.99, isVeg: true, isAvailable: false },
                { _id: 5, category: "dessert", name: "Mango Sticky Rice", description: "Sweet sticky rice with mango", price: 6.99, isVeg: true, isAvailable: true }
            ],
            tables: [
                { _id: 1, tableNumber: "A1", capacity: 2, location: "indoor", isActive: true },
                { _id: 2, tableNumber: "A2", capacity: 4, location: "indoor", isActive: true },
                { _id: 3, tableNumber: "B1", capacity: 6, location: "indoor", isActive: true }
            ]
        }
    ]

    Restaurant.insertMany(sampleData)
}

module.exports = {
    connectDB,
    seedData
}