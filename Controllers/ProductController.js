const { findByIdAndDelete } = require('../Models/Product')
const Product = require('../Models/Product')


const index = (req,res,next) => {
    Product.find()
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
    let productID = req.body.productID
    console.log(productID)
    Product.findById(productID)
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
        let product = new Product({
            title: req.body.title,
            stock: req.body.stock,
            prix: req.body.prix,
            owned_by: req.body.owned_by,
            description: req.body.description,
        })
    
        if(req.file){
            product.image = req.file.filename
        }
    
        product.save()
        .then(response => {
            res.json({
                message: 'product added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}



const update = (req, res, next) => {
    let productID = req.body.productID
    console.log(productID)
    let updatedData = {
        stock: req.body.stock,
        prix: req.body.prix,
        description: req.body.description,
        //image: req.file.path

    }

    Product.findByIdAndUpdate(productID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'product updated'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}



const destroy = (req, res, next) => {
    let productID = req.body.productID
    console.log(productID)
    Product.findByIdAndDelete(productID)
    .then(() => {
        res.json({
            message: 'Product deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}


const usersProducts = (req, res, next) => {
    let productID = req.params.productID
    console.log(productID)
    Product.find({owned_by: productID})
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
    index,show,add,update,destroy,usersProducts
}