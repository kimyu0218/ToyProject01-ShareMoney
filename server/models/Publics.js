const mongoose = require('mongoose');

const publicSchema = mongoose.Schema({
    travel_id: {
        type: String,
        unique: 1
    },
    cost: {
        type: Number
    }
})

publicSchema.pre('save', function(next){
    next()
})

const Public = mongoose.model('Public', publicSchema)
module.exports = { Public }