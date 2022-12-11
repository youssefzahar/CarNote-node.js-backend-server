const express = require('express')
const router = express.Router()
const ProductController = require('../Controllers/ProductController')
const upload = require('../Middleware/Upload')


router.get('/' ,  ProductController.index)//////
router.get('/show/:productID',  ProductController.show)
router.post('/add', /*upload.array('image[]')*/ upload.single('image'),  ProductController.add)///
router.put('/update',  ProductController.update)///
router.delete('/delete',  ProductController.destroy)///


module.exports = router
