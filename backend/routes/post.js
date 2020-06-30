const express = require("express")
const multer = require("multer")
const path = require("path")

const db = require("../models")
const { isLoggedIn } = require("./middlewares")

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads")
    },
    filename(req, file, done) {
      console.log(file)
      const ext = path.extname(file.originalname)
      const basename = path.basename(file.originalname, ext) // 제로초.png, basename = 제로초, ext = .png
      done(null, basename + Date.now() + ext)
    },
  }),
  limit: { fileSize: 20 * 1024 * 1024 },
})
router.post("/images", isLoggedIn, upload.array("image"), (req, res) => {
  console.log(req.files)
  res.json(req.files.map((v) => v.filename))
})

router.post("/", isLoggedIn, async (req, res, next) => {
  // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g)
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      )
      await newPost.addHashtags(result.map((r) => r[0]))
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    })
    return res.json(fullPost)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    })
    if (!post) {
      return res.status(404).send("not exist post")
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
          order: [["createdAt", "ASC"]],
        },
      ],
    })
    return res.json(comments)
  } catch (e) {
    console.error(e)
    next(e)
  }
})
router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    })
    if (!post) {
      return res.status(404).send("post 존재 X")
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    })

    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    })
    return res.json(comment)
  } catch (e) {
    next(e)
  }
})

module.exports = router
