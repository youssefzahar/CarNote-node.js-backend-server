const express = require('express')
const router = express.Router()
const EntretienController = require('../Controllers/EntretienController')


router.get('/' ,  EntretienController.index)
router.get('/show',  EntretienController.show)
router.get('/usersEntretien/:userID',  EntretienController.usersEntretien)
router.post('/add', EntretienController.add)///////////////////////
router.post('/delete',  EntretienController.destroy)


module.exports = router
