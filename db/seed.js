const mongoose = require('./connection')
const Image = require('../models/image')
const db = mongoose.connection
const manyImages = require('./seedImage.json')

Image.deleteMany({}).then(()=>{
    Image.insertMany(manyImages).then((images)=>{
        console.log(images)
        db.close()
    })
})