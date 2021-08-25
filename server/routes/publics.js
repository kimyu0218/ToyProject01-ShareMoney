const express = require('express');
const router = express.Router();
const { Public } = require("../models/Publics");

router.post("/save", (req, res) => {
    const pub = new Public(req.body);
    
    pub.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/bringup', (req, res) => {
    Public.findOne({ travel_id: req.body.travel_id }, (err, pub) => {
        if(pub) {
          return res.json({
            success: true,
            data: pub
          })
        } else {
          return res.json({ success: false })
        }
    })
})

router.post('/update', (req, res) => {
  Public.findOneAndUpdate({ travel_id: req.body.travel_id }, 
    { 
      cost: req.body.cost,
      persons: req.body.persons,
      contributions: req.body.contributions
    })
  .exec((err, doc) => {
    if (err) return res.status(400).send(err)
    res.status(200).json({ success: true, doc })
  })
})

router.post('/detail', (req, res) => {
  Public.findOne({ travel_id: req.body.travel_id }, (err, pub) => {
    if(pub) {
      return res.json({
        success: true,
        data: pub
      })
    } else {
      return res.json({ success: false })
    }
  })
})

module.exports = router;