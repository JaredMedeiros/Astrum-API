const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add a username']
    },

    email:{
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }    
    },

    password:{
        type: String,
        required: [true, 'Please add a password']
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)