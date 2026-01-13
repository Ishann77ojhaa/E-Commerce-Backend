const multer = require("multer")

const storage = multer.diskStorage({
    destination : function (req, file,  cb){
    const allowedfiletypes = ['image/png','image/jpg','image/jpeg']
    if(!allowedfiletypes.includes(file.mimetype)){
        cb(new Error("File Not Supported"))
        return
    }
    cb(null,'./uploads')
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})
module.exports ={
    multer,
    storage
}