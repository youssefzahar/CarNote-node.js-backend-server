const { response } = require('express')
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const index = (req,res,next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

const show = (req, res, next) =>{
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            mesaage: 'An error occured'
        })
    })
}

const register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error : err
            })
        }

        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            cin: req.body.cin,
            email: req.body.email,
            password: hashedPass,
            phone_number: req.body.phone_number,
            role: req.body.role,
            emailToken: crypto.randomBytes(64).toString('hex'),
            isVerified: false
        })

    
        if(req.file){
            user.image = req.file.path
        }
    
        user.save()
        .then(response => {
            res.json({
                message: 'user added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
        let transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 465,
            secure : true,
            auth:{
                user: 'youssef.zahar@esprit.tn',
                pass: '9400613889'
            },
            tls:{
                rejectUnauthorized : false
            }
        })
        var mailOptions = {
            from: ' "Verify your email" <youssef.zahar@esprit.tn>',
            to: user.email,
            subject: 'Verify you Mail',
            html: `<h2> ${user.name}! Thanks for regestering !</h2>
            <h4> Please verify your mail to continue... </h4>
            <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify Your Email</a>`
        }
     
        

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }else{
                console.log("verification")
            }
        })


    })
}




const update = (req, res, next) => {
    let userID = req.body.cin
    let updatedData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        cin: req.body.cin,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
        image: req.body.image
    }

    User.findOneAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'user updated'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}



const destroy = (req, res, next) => {
    let userID = req.body.cin
    User.findOneAndRemove(userID)
    .then(() => {
        res.json({
            message: 'user deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    
    User.findOne({$or: [{email:username},{phone_number:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'secret', {expiresIn: '1h'})
                    res.json({
                        message: 'Login successfull',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password incorrect'
                    })
                }
            })
        }else{
            res.json({
                message: 'No such user found'
            })
        }
    })
    
}


const changePassword = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error : err
            })
        }

        let userID = req.body.cin
        let updatedData = {
            password: hashedPass
        }
        var username = req.body.username
        
        User.findOneAndUpdate({$or: [{email:username},{phone_number:username}]}, {$set: updatedData})
        .then(response => {
            res.json({
                message: 'password updated'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })

    })
    
    
}










module.exports = {
    index,show,register,update,destroy,login,changePassword
}