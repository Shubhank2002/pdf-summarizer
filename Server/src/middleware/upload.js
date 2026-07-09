const multer =  require('multer')

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf'){
        cb(null, true)
    }else{
        cb(new Error('file other than pdf are not allowed'), false)
    }
}

const upload = multer({storage,
    fileFilter,
    limits:{
       fileSize: 1024*1024*10
    }
})

module.exports = upload

