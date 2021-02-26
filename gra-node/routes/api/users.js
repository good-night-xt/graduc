// @login & register
const express = require('express');
const router = express.Router();
// 密码加密
const bcrypt = require('bcrypt');
// token
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys')

// $route POST api/users/register
// @desc  注册数据
router.post("/register", (req, res) => {
  // res.json({msg: req.body})

  // 查询数据库中是否拥有该账号
  User.findOne({ account: req.body.account })
    .then((user) => {
      if (user) {
        return res.status(404).json({ msg: '该账号已被注册' })
      } else {
        const newUser = new User({
          name: req.body.name,
          account: req.body.account,
          password: req.body.password,
          member: req.body.member
        })
        // console.log(newUser)

        // 使用bcrypt进行密码加密
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }

    })
})

// $route POST api/users/login
// @desc  返回token jwt passport
router.post("/login", (req, res) => {
  const account = req.body.account;
  const password = req.body.password;

  // 查询数据库
  User.findOne({ account: account })
    .then(user => {
      if (!user) {
        return res.status(404).json({ stateCode: 404 })
      }

      // 密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {
              id: user.id,
              name: user.name
            };
            // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
            jwt.sign(rule, keys.secretOrKey, { expiresIn: 2592000 }, (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token,
                userData: user
              })
            })
          } else {
            return res.status(400).json({ password: "密码错误" })
          }
        })
    })
})

// $route POST api/users/edit
// @desc  修改数据
router.post("/edit", (req, res) => {
  User.updateOne({ account: req.body.account }, { name: req.body.name }, () => {
    res.json({ success: true })
  })

})

module.exports = router;
