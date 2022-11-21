const { response } = require('express')
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const { findOne } = require('../Models/User')

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
    let userID = req.body.email
    User.findOne(userID)
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
            isVerified: false,
        })

    
       /* if(req.file){
            user.image = req.file.path
        }*/
    
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

        transporter.use('compile',hbs({
          viewEngine: 'express-handlebars',
          viewPath: './templates/'
        }))
        
        
        var mailOptions = {
            from: ' "Verify your email" <youssef.zahar@esprit.tn>',
            to: user.email,
            subject: 'Verify you Mail',
            html: `hi`,
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

const verifyAccount = (req, res, next) => {
    let token = req.body.emailToken
    let updatedData = {
        isVerified: true        
    }

    User.findOneAndUpdate(token, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'user verified'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}


const update = (req, res, next) => {
    let userID = req.body.email
    console.log(userID)
    let updatedData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        cin: req.body.cin,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role: req.body.role,
        image: req.file.path
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
    let userID = req.body.email
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
       // if(user.isVerified){
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    res.json({
                        message: 'Login successfull',
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
    /*}
    else{
        res.json({
            message: 'User Not Verified'
        })

    }*/
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


const forgotPassword = (req, res, next) => {
    //generateAndSendCode();
    var code = req.body.code
    console.log(code)
    if(User.findOne(code)){
    //let username = req.body.email
    var username = req.body.username
    console.log(username)
    const resetPassword = Math.random().toString(36).substring(1,11);
    console.log(resetPassword)
    bcrypt.hash(resetPassword, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error : err
            })
        }
    let updatedData = {
        password: hashedPass
    }

    User.findOneAndUpdate(username, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'password reset'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
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
    from: ' "Reset password" <youssef.zahar@esprit.tn>',
    to: username,
    subject: 'Here is your new reset password',
    html: `${resetPassword}`,
}     

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    }else{
        console.log("Reset password")
    }
})
    }
    else{
        console.log("wrong code")
    }

}




const generateAndSendCode = (req, res, next) => {
    var username = req.body.username
    console.log(username)
    const newcode = Math.random().toString(36).substring(1,5);
    console.log(newcode)     

    let updatedData = {
        code: newcode
    }

    User.findOneAndUpdate(username, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'code updated'
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
    from: ' "Reset Code" <youssef.zahar@esprit.tn>',
    to: username,
    subject: 'Here is your Code',
    html: `${newcode}`,
}     

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    }else{
        console.log("Reset password")
    }
})
}


module.exports = {
    index,show,register,update,destroy,login,changePassword,verifyAccount,forgotPassword,generateAndSendCode
}