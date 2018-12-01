var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/shops');
var ctrlOthers = require('../controllers/others');

/*Get home page*/

router.get('/', ctrlLocations.homelist);
router.get('/shop', ctrlLocations.shopinfo);
router.get('/shop/test_lips', ctrlLocations.shoptestlips);
router.get('/shop/test_eyebrows', ctrlLocations.shoptesteyebrows);
router.get('/shop/range', ctrlLocations.shoprange);
router.get('/shop/review/new', ctrlLocations.viewgoods);

/* Get other page. */

router.get('/about', ctrlOthers.about);

module.exports = router;