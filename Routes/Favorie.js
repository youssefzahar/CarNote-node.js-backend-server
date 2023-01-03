const express = require('express')
const router = express.Router()
const FavorieController = require('../Controllers/FavorieController')


router.get('/' ,  FavorieController.index)
router.get('/show',  FavorieController.show)
router.get('/usersFavorie/:userID',  FavorieController.usersFavorie)
router.post('/add', FavorieController.add)///////////////////////
router.post('/delete',  FavorieController.destroy)


module.exports = router
