const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
    const user = new User(req.body);
    console.log(user)
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ id: req.body.id }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
    })
})

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post('/checkId', (req, res) => {

    User.findOne({ id: req.body.id }, (err, user) => {
      if(!user) {
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

router.post('/checkEmail', (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
      if(!user) {
        return res.json({
          permit: true,
          message: "사용할 수 있는 이메일입니다."
        })
      } else {
        return res.json({
          permit: false,
          message: "사용할 수 없는 이메일입니다."
        })
      }
    })
})

module.exports = router;