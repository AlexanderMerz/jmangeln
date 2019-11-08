const router = require('express').Router();
const categoryController = require('../controllers/category-controller');
const productController = require('../controllers/product-controller');
const blogController = require('../controllers/blog-controller');
const youtubeService = require('../services/youtube-service');

router.get('/youtube', youtubeService.getVideos);

router.get('/blogs', blogController.getPosts);

router.get('/products', productController.getProducts);

router.get('/categories', categoryController.getCategories);

module.exports = router;
