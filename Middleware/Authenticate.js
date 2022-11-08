const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]
        const decode = jwt.verify(token, 'secret')

        req.user = decode
        next()
    }
    catch(error){
        res.json({
            message: 'Authentification Failed'
        })
    }
}

const verifyEmail = async(req,res,next)=>{
    try{
        const user = await User.findOne({ email: req.body.email })
        if(user.isVerified){
            next()
        }
        else{
            console.log("Please check your email to verify your account")
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { authenticate, verifyEmail }