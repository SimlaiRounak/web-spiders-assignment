const { Restaurant } = require('../models')

/**
 * Controller function to fetch the menu of a restaurant by ID
 * 
 * @param {Object} req - Express request object containing restaurant ID in params
 * @param {Object} res - Express response object used to return restaurant menu
 * @returns {JSON} Restaurant name and menu array or appropriate error message
 */
const getMenu = async (req, res) => {
    try {

        const { id } = req.params
        const restaurant = await Restaurant.findById(id)

        if (!restaurant) {
            return res.status(404).json({
                message: 'Restaurant not found !'
            })
        }

        return res.status(200).json({
            name: restaurant.name,
            menu: restaurant.menu
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            message: 'Something went wrong !'
        })
    }
}

/**
 * Controller function to fetch the menu categories of a restaurant by ID
 * 
 * @param {Object} req - Express request object containing restaurant ID in params
 * @param {Object} res - Express response object used to return restaurant menu categories
 * @returns {JSON} Restaurant menu categories array or appropriate error message
 */

const getMenuCategories = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                message: 'Restaurant not found!',
            });
        }

        const categories = restaurant.menu.reduce((acc, item) => {
            console.log(item.category)
            if (!item.isAvailable) {
                return acc;
            }

            const categoryName = item.category?.toLowerCase();
            if (!categoryName) {
                return acc;
            }

            const existingCategory = acc.find(cat => cat.name === categoryName);

            if (existingCategory) {
                existingCategory.availableCount += 1;
            } else {
                acc.push({
                    name: categoryName,
                    availableCount: 1,
                });
            }

            return acc;
        }, []);

        categories.sort((a, b) => a.name.localeCompare(b.name));

        return res.status(200).json({ categories });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: 'Something went wrong!',
        });
    }
};


module.exports = {
    getMenu,
    getMenuCategories
}