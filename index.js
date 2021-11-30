const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require('body-parser')
const { User, Logs } = require('./schema.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.connect("mongodb://localhost:27017/blog")


// This will display all the users

app.get("/users", (req, res) => {
    const data = User.find()
    run()
    async function run(){
        const data = await User.find()
        res.json(data)
    }
})

app.post("/users", (req, res) => {
    if(req.body.username, req.body.email, req.body.password){

        createUser(req.body.username, req.body.age ? req.body.age : null, req.body.email, req.body.password)

        res.json({msg: "New user create successfully"})
    }else{
        res.status(400).json({msg: "Username, Email and Password is mandatory"})
    }

})


// this function will create a new user
async function createUser(username, userAge, email, password){
    try{
        const user = await User.create({
            username: username,
            age: userAge ? userAge : null,
            email: email,
            password: password,
        })
        console.log(user)

    } catch(e){
        console.log(e.message)
    }
}

// this function will update an existing user and will upload the information about the updated user in the logs colletion

async function updateUser(){

    // atleast email, username or password should be there to run this function

    if(newEmail || newUsername || newPassword){
        const log = await Logs.create({
            username: username,
            password: password,
            newEmail: newEmail ? newEmail : null,
            newUsername: newUsername ? newUsername : null,
            newPassword: newPassword ? newPassword : null
        })

        console.log(log)
        
    }else{
        console.log("Atleat new email, new username or new password should be filled")
    }
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})