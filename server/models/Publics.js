const mongoose = require('mongoose');

const publicSchema = mongoose.Schema({
    travel_id: {
        type: String
    },
    travel_account: {
        type: Number
    },
    own_cash: {
        type: Number
    },
    foreign_cash: {
        type: Number
    },
    own_card: {
        type: Number
    },
    foreign_card: {
        type: Number
    }
})

publicSchema.pre('save', function(next){
    next()
})

const Public = mongoose.model('Public', publicSchema)
module.exports = { Public }