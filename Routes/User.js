const express = require('express')
const router = express.Router()

const UserController = require('../Controllers/UserController')
const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')

router.get('/',UserController.index)
router.post('/show',UserController.show)
router.post('/register', upload.single('image') ,UserController.register)
//router.post('/register', UserController.register)
router.post('/update',UserController.update)
router.post('/delete',UserController.destroy)
router.post('/login',UserController.login)

module.exports = router
