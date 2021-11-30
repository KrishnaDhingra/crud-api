const mongoose  = require("mongoose")

const newUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: Number,
    email: String,
    password: {
        type: String,
        required: true
    },
    createdAt: {
        default: () => Date.now,
        immutable: true
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
        default: () => Date.now,
        immutable: true
    }
})


module.exports = mongoose.model("users", userSchema)