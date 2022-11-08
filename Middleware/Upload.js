const path   = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    dest:'upload',
    fileFilter(req, file, callback){
        if(
            file.mimetype == "image/png" || file.mimetype == "image/jpg"
        ){
            callback(null, true)
            async(req,res) =>{
                res.send()
            }
        } else{
            console.log('only png and jpg are supported')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }/*
    dest:'upload',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(file.originalname.endsWith('.jpg'))
        return cb(new Error('file format is incorrect'));
        cb(undefined,true)
    }*/
})

module.exports = upload