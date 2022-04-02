const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

//register new user //get request
const registerUser =  async(req, res) => {
    const { username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400).send('Please add all fields')
        // throw new Error('Please add all fields')
    }
    try {
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400).send('User already exists')
        // throw new Error('User already exists');
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword

    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } 
} catch(e) {
    res.status(400).send('Invalid user data')
        // throw new Error('Invalid user data')
}
}

//authenticate a user // post request
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error('Invalid login credentials')
    }
})

//private access 
const getMine = asyncHandler (async (req, res) => {
    res.json({message: 'user data display'})
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMine
}