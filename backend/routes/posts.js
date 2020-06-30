const express = require("express")
const multer = require("multer")
const path = require("path")

const db = require("../models")
const { isLoggedIn } = require("./middlewares")

const router = express.Router()

router.get("/", async (req, res, next) => {
  //
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    })
    res.json(posts)
  } catch (e) {
    next(e)
  }
})

module.exports = router
