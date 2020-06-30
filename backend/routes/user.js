const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const { isNotLoggedIn, isLoggedIn } = require("./middlewares")
const db = require("../models")
const router = express.Router()

router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12)
    const { email, nickname } = req.body

    const exUser = await db.User.findOne({
      where: { email },
    })
    if (exUser) {
      return res.status(403).json({
        errorCode: 403,
        message: "already",
      })
    }
    const newUser = await db.User.create({
      email,
      nickname,
      password,
    })
    return res.status(201).json(newUser)
  } catch (err) {
    return next(err)
  }
})

router.post("/login", isNotLoggedIn, (req, res, next) => {
  try {
    console.log("login\n\n\n")
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      if (info) {
        return res.status(401).json(info.reason)
      }
      return req.login(user, async (err) => {
        if (err) {
          console.error(err)
          return next(err)
        }
        console.log("\n\n", req.isAuthenticated())
        return res.json(user)
      }) // 세션에 사용자 정보 저장
    })(req, res, next)
  } catch (e) {
    console.error(e)
    return next(e)
  }
})

router.post("/logout", isLoggedIn, (req, res) => {
  // 실제 주소는 /user/logout
  console.log("logout \n\n\n", req.isAuthenticated(), "\n\n")
  if (req.isAuthenticated()) {
    console.log("??\n\n\n", req.isAuthenticated(), "\n\n")
    req.logout()
    req.session.destroy() // 선택사항
    return res.status(200).send("로그아웃 되었습니다.")
  }
})
// router.post("/logout", (req, res) => {
//   if (req.isAuthenticated()) {
//     req.logout()
//     req.session.destroy()
//     return res.status(200).send("logout")
//   }
// })

module.exports = router
