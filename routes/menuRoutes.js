/**
 * @file menuRoutes.js
 * @description Defines routes for retrieving a restaurant's menu and menu categories.
 *
 * @route GET /restaurants/:id/menu
 * @description Get the full menu of a restaurant by ID.
 * @access Public
 * @controller getMenu
 *
 * @route GET /restaurants/:id/menu/categories
 * @description Get available menu categories with count of available items per category.
 * @access Public
 * @controller getMenuCategories
 */

const express = require('express')
const { getMenu, getMenuCategories } = require('../controllers')

const router = express.Router({ mergeParams: true });

router.get('/', getMenu);
router.get('/categories', getMenuCategories);

module.exports = router
