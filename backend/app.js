const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send("hi back")
})

const port = 3085
app.listen(port, () => {
  console.log(`app listen ${port}`)
})
