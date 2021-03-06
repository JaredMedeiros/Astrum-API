const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

//register new user //get request
const registerUser =  asyncHandler(async (req, res) => {
    const { username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
  
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email,
        password: hashedPassword

    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        }) 
    } else {
    res.status(400)
        throw new Error('Invalid user data')
    }
})

//authenticate a user // post request
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
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
    res.status(200).json(req.user)
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const findAll = (req, res) => {
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
}

module.exports = {
    registerUser,
    loginUser,
    getMine,
    findAll,
}