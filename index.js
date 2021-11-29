const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Hello world")
})
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})