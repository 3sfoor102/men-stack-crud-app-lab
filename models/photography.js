const mongoose = require('mongoose')

const photographySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    reservationDate: Date,
    reservationPackage: String,
})

const Photography = mongoose.model('Photography', photographySchema)

module.exports = Photography