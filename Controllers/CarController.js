const Car = require('../Models/Car')


const index = (req,res,next) => {
    Car.find()
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
    let carID = req.body.carID
    console.log(carID)
    Car.findById(carID)
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


const add1 = (req, res, next) => {
        let car = new Car({
            modele: req.body.modele,
            immatricule: req.body.immatricule,
            type: req.body.type,
            marque: req.body.marque,
            puissance: req.body.puissance,
            carburant: req.body.carburant,
            description: req.body.description,
            owned_by: req.body.owned_by,
            age: req.body.age,
            image: req.body.image,
            attribute: "private",
        })
    
       /* if(req.file){
            car.image = req.file.path
        }*/
    
        car.save()
        .then(response => {
            res.json({
                message: 'car added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}



const update = (req, res, next) => {
    let carID = req.body.carID
    console.log(carID)
    let updatedData = {
        modele: req.body.modele,
        marque: req.body.marque,
        puissance: req.body.puissance,
        carburant: req.body.carburant,
        description: req.body.description,
        age: req.body.age,
        //image: req.file.path

    }

    Car.findByIdAndUpdate(carID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'car updated'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}



const destroy = (req, res, next) => {
    let carID = req.body.carID
    Car.findByIdAndDelete(carID)
    .then(() => {
        res.json({
            message: 'car deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}



const makePublic = (req, res, next) => {
    let carID = req.body.carID
    console.log(carID)
    let updatedData = {
        attribute: 'public'

    }

    Car.findByIdAndUpdate(carID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'car public'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}

const showMarketplace = (req,res,next) => {
    if(Car.attribute == "public"){
    Car.find()
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
} else {
    mesaage: 'no car for sale'
}
}



const add = (req, res, next) => {

        let car = new Car({
            modele: req.body.modele,
            type: req.body.type,
            marque: req.body.marque,
            immatricule: req.body.immatricule,
            puissance: req.body.puissance,
            carburant: req.body.carburant,
            description: req.body.description,
            //owned_by: req.body.owned_by,
            age: req.body.age,
            //image: req.body.image,
            attribute: "private",
            //attribute: req.body.attribute,

        })
    
        car.save()
        .then(response => {
            res.json({
                message: 'car added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}

module.exports = {
    index,show,add,update,destroy,showMarketplace,makePublic
}