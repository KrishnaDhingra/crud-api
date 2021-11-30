const mongoose  = require("mongoose")

try{
    const newUserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        age: Number,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
    
    const updateUserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        newEmail: String,
        newUsername: String,
        newPassword: String,
        updatedAt: {
            type: Date,
            default: () => Date.now,
            immutable: true
        }
    })
    
    module.exports.User = mongoose.model("users", newUserSchema)
    module.exports.Lo = mongoose.model("logs", updateUserSchema)

} catch(e){
    console.log(e.message)
}

