const Favorie = require('../Models/favorie')


const index = (req,res,next) => {
    Favorie.find()
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
    let favorieID = req.body.favorieID
    console.log(favorieID)
    Favorie.findById(favorieID)
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


const add = (req, res, next) => {
        let favorie = new Favorie({
            user: req.body.user,
            car: req.body.car,
        })
    
        favorie.save()
        .then(response => {
            res.json({
                message: 'favorie added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}



const destroy = (req, res, next) => {
    let favorieID = req.body.favorieID
    Favorie.findByIdAndDelete(favorieID)
    .then(() => {
        res.json({
            message: 'favorie deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}

const usersFavorie = (req, res, next) => {
    let userID = req.params.userID
    console.log(userID)
    Favorie.find({user: userID})
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


module.exports = {
    index,show,add,destroy,usersFavorie
}