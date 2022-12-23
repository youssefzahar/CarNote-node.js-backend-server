const express = require('express')
const router = express.Router()
const CarController = require('../Controllers/CarController')
//const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')
const upload = require('../Middleware/Upload')


router.get('/' ,  CarController.index)//////
router.get('/show',  CarController.show)
router.get('/showMarketplace',  CarController.showMarketplace)//////////////////////////////////////
router.get('/userCars/:carID',  CarController.userCars)////////////////////////
router.post('/add', upload.single('image'),  CarController.add)///
router.post('/update',  CarController.update)///
router.post('/delete',  CarController.destroy)///////////////////////////////
router.post('/makePublic',  CarController.makePublic)///////////////////////


module.exports = router