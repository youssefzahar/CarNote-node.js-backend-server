const express = require('express')
const router = express.Router()
const user = require('../Models/User')
const nodemailer = require('nodemailer')
const UserController = require('../Controllers/UserController')
const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')


router.get('/' , UserController.index)////////
router.get('/show',  UserController.show)
router.post('/register', UserController.register)//////////////////////
router.post('/update',UserController.update)///////////////////////////
router.post('/delete',UserController.destroy)
router.post('/login', UserController.login)//////////////////////////////
router.patch('/changePassword',UserController.changePassword)////////////
router.post('/verifyAccount', UserController.verifyAccount)
router.post('/forgotPassword', UserController.forgotPassword)////////////

module.exports = router
