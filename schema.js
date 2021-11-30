const mongoose  = require("mongoose")

try{
    const newUserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
    
    const LogsSchema = new mongoose.Schema({
        message: String,
        username: String,
        password: String,
        newEmail: String,
        newUsername: String,
        newPassword: String
    })
    
    module.exports.User = mongoose.model("users", newUserSchema)
    module.exports.Logs = mongoose.model("logs", LogsSchema)

} catch(e){
    console.log(e.message)
}

