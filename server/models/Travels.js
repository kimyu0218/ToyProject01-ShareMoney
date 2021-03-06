const mongoose = require('mongoose');

const travelSchema = mongoose.Schema({
    destination:{
        type: String,
        trim: true
    },
    travel_id:{
        type: String,
        unique: 1
    },
    currency_unit: {
        type: String
    },
    personnel: {
        type: Number
    },
    persons: [String],
    date: [String]
})

travelSchema.pre('save', function(next){
    next()
})

const Travel = mongoose.model('Travel', travelSchema)
module.exports = { Travel }