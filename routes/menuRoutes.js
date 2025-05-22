const express = require('express')
const { getMenu, getMenuCategories } = require('../controllers')

const router = express.Router({ mergeParams: true });

router.get('/', getMenu);
router.get('/categories', getMenuCategories);

module.exports = router
