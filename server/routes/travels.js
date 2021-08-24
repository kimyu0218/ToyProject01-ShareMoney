const express = require('express');
const router = express.Router();
const { Travel } = require("../models/Travels");

router.post("/generate", (req, res) => {
    const travel = new Travel(req.body);

    travel.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post('/checkId', (req, res) => {
    Travel.findOne({ travel_id: req.body.travel_id }, (err, travel) => {
      if(!travel) {
        return res.json({
          permit: true,
          message: "사용할 수 있는 아이디입니다."
        })
      } else {
        return res.json({
          permit: false,
          message: "사용할 수 없는 아이디입니다."
        })
      }
    })
})

router.post('/join', (req, res) => {
  Travel.findOne({ travel_id: req.body.travel_id }, (err, travel) => {
    if(travel) {
      return res.json({
        success: true,
        message: "아이디를 찾았습니다.",
        data: travel
      })
    } else {
      return res.json({
        success: false,
        message: "존재하지 않는 아이디입니다."
      })
    }
  })
})

router.post('/find', (req, res) => {
  Travel.find({ owner: req.body.owner })
    .exec((err, travels) => {
      if(err) return res.status(400).send(err)
      return res.status(200).json({ success: true, travels })
    })
})

router.post('/delete', (req, res) => {
  Travel.findOneAndDelete({ _id: req.body._id })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, doc })
    })
})

module.exports = router;