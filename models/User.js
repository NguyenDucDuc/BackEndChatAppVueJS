const mongoose = require('mongoose')

const userShcema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

const User = mongoose.model('User', userShcema)
module.exports = {User}