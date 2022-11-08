const express = require('express')
const router = express.Router()
const user = require('../Models/User')
const nodemailer = require('nodemailer')

const UserController = require('../Controllers/UserController')
const upload = require('../Middleware/Upload')
const authenticate = require('../Middleware/Authenticate')
const {verifyEmail} = require("../Middleware/Authenticate")

router.get('/' , UserController.index)
router.post('/show',  UserController.show)
router.post('/register', upload.single('image'), UserController.register)
router.post('/update',UserController.update)
router.post('/delete',UserController.destroy)
router.post('/login', verifyEmail, UserController.login)
router.patch('/changePassword',UserController.changePassword)
/*router.post('/upload', upload.single('upload'), async(req,res) =>{
    res.send()
})*/

router.get('/verify-email',async(req,res)=>{
    try{
        const token = req.query.token
        const user = await User.findOne({ emailToken: token})
        if(user){
            user.emailToken = null
            user.isVerified = true
            await user.save()
            res.redirect('/login')
        }
        else{
            console.log('email is not verified')
        }
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router
