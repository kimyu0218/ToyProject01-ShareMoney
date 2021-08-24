const mongoose = require('mongoose');

const consumptionSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    travel_id: {
        type: String
    },
    travel_account: {
        type: Number
    },
    travel_account_pub: {
        type: Number
    },
    own_cash: {
        type: Number
    },
    own_cash_pub: {
        type: Number
    },
    foreign_cash: {
        type: Number
    },
    foreign_cash_pub: {
        type: Number
    },
    own_card: {
        type: Number
    },
    own_card_pub: {
        type: Number
    },
    foreign_card: {
        type: Number
    },
    foreign_card_pub: {
        type: Number
    }
})

consumptionSchema.pre('save', function(next){
    next()
})

const Consumption = mongoose.model('Consumption', consumptionSchema)
module.exports = { Consumption }