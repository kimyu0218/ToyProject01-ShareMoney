const express = require('express');
const router = express.Router();
const { Consumption } = require("../models/Consumptions");

router.post("/save", (req, res) => {
    const con = new Consumption(req.body);

    con.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/bringup', (req, res) => {
    Consumption.findOne({ user_id: req.body.user_id, travel_id: req.body.travel_id }, (err, con) => {
        if(con) {
          return res.json({
            success: true,
            data: con
          })
        } else {
          console.log(err)
          return res.json({ success: false })
        }
    })
})

router.post('/update', (req, res) => {
  Consumption.findOneAndUpdate({ user_id: req.body.user_id, travel_id: req.body.travel_id }, 
    { 
      travel_account: req.body.travel_account,
      travel_account_pub: req.body.travel_account_pub,
      own_cash: req.body.own_cash,
      own_cash_pub: req.body.own_cash_pub,
      foreign_cash: req.body.foreign_cash,
      foreign_cash_pub: req.body.foreign_cash_pub,
      own_card: req.body.own_card,
      own_card_pub: req.body.own_card_pub,
      foreign_card: req.body.foreign_card,
      foreign_card_pub: req.body.foreign_card_pub
    })
  .exec((err, doc) => {
    if (err) return res.status(400).send(err)
    res.status(200).json({ success: true, doc })
  })
})

module.exports = router;