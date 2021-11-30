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

    // this function will display all the users
    getData()
    async function getData(){
        const data = await User.find()
        res.json(data)
    }
})



// This will create a new user
app.post("/users", (req, res) => {

    // checking if username, email and password is provided if not it will display an error message
    if(req.body.username && req.body.email && req.body.password){

        createUser(req.body.username, req.body.age ? req.body.age : null, req.body.email, req.body.password)

        res.json({msg: "New user created successfully"})
    }else{
        res.status(400).json({msg: "Username, Email and Password is mandatory"})
    }

})

// This will update an existing user
app.put("/users", (req, res) => {

    try{
        
        getUser()
        async function getUser(){
            
            if(req.body.username && req.body.password && req.body.newEmail || req.body.newUsername || req.body.newPassword){
                
                const data = await User.where("username").equals(req.body.username)
    
                if(data.length == 0){
                    res.status(400).json({msg: `No user with the username of ${req.body.username} was found`})
    
                }else if(data.length > 0 && data[0].password !== req.body.password){

                    console.log(data[0].username, req.body.password, data)
                    res.status(400).json({msg: "The password to the username is not correct"})
    
                }else{
        
                    updateUser(data[0]._id, data[0].username, data[0].email, data[0].password, req.body.username, req.body.password, req.body.newEmail, req.body.newUsername, req.body.newPassword)
        
                    res.json({msg: "User updated"})
                }
    
            }else{
                res.status(400).json({msg: "Atleat new email, new username or new password should be filled"})
            }
        }

    } catch(e){
        console.log(e.message)
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

async function updateUser(id, preUsername, preEmail, prePassword, Username, Password, newEmail, newUsername, newPassword){

    getData()

    async function getData(){
        const username = newUsername ? newUsername : preUsername
        const email = newEmail ? newEmail : preEmail
        const password = newPassword ? newPassword : prePassword

        console.log(username, email, password )
        const data = await User.where("_id").equals(id).updateMany({"username": username, "email": email, "password": password})
    }

    // const log = await Logs.create({
    //     username: username,
    //     password: password,
    //     newEmail: newEmail ? newEmail : 'same',
    //     newUsername: newUsername ? newUsername : 'same',
    //     newPassword: newPassword ? newPassword : 'same'
    // })

    // console.log(log)
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})