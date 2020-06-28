const express = require("express")
const cors = require("cors")
const db = require("./models")
const passportConfig = require("./passport")
const app = express()
const bcrypt = require("bcrypt")

db.sequelize.sync()

app.use(cors("http://localhost:3000"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("ih")
})

app.post("/user", async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12)
    const { email, nickname } = req.body

    const exUser = await db.User.findOne({
      email,
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

app.post("/user/login", (req, res) => {
  req.body.email
  req.body.password
})

const port = 3085
app.listen(port, () => {
  console.log(`app listen ${port}`)
})
