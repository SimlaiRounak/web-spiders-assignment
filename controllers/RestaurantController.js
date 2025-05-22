const { Restaurant } = require('../models');

/**
 * Controller function to fetch the list of restaurants
 * 
 * @param {Object} req - Express request object containing various filters in query
 * @param {Object} res - Express response object used to return reservations
 * @returns {JSON} Restaurant reservations array or appropriate error message
 */

const searchRestaurants = async (req, res, next) => {
    try {
        // Extract query parameters with defaults
        const {
            cuisine,
            location,
            minRating = 0,
            page = 1,
            limit = 10
        } = req.query;

        // Build filter object
        const filter = {};

        if (cuisine) filter.cuisine = new RegExp(cuisine, 'i'); // Case-insensitive match
        if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive match
        if (minRating) filter.rating = { $gte: parseFloat(minRating) };

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitNum = parseInt(limit);

        // Execute queries in parallel for better performance
        const [results, total, availableCuisines] = await Promise.all([
            // Query for restaurants that match filters with pagination
            Restaurant.find(filter)
                .skip(skip)
                .limit(limitNum)
                .lean(),

            // Count total restaurants matching the filter
            Restaurant.countDocuments(filter),

            // Get distinct cuisines from the database
            Restaurant.distinct('cuisine')
        ]);

        // Calculate total pages
        const pages = Math.ceil(total / limitNum);

        // Send response
        res.json({
            results,
            total,
            page: parseInt(page),
            pages,
            availableCuisines
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller function to fetch the details of a restaurant by ID
 * 
 * @param {Object} req - Express request object containing restaurant ID in path
 * @param {Object} res - Express response object used to return restaurant details
 * @returns {JSON} Restaurant details object or appropriate error message
 */

const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        res.json(restaurant);
    } catch (error) {
        console.error('Error retrieving restaurant:', error);
        res.status(500).json({ error: 'Failed to retrieve restaurant' });
    }
};

module.exports = {
    searchRestaurants,
    getRestaurantById
}