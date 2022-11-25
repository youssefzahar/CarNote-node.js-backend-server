const express = require('express')
const router = express.Router()
const ProductController = require('../Controllers/ProductController')
const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')


router.get('/' ,  ProductController.index)//////
router.get('/show',  ProductController.show)
router.post('/add', /*upload.array('image[]')*/ upload.single('image'),  ProductController.add)///
router.post('/update',  ProductController.update)///
router.post('/delete',  ProductController.destroy)///


module.exports = router
