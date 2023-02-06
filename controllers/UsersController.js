const Users = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Register New Users
// @access Public
const registerUser = async (req, res) => {
    const {userName, email, password} = req.body

    if(!userName || !email || !password){
        res.status(400).json({message: 'Please fill up the form'})
        return
    }

    // User already exist
    const userExist = await Users.findOne({userName})
    if(userExist){
        res.status(400).json({message: 'User already exist'})
        return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    // Create User

    const user = await Users.create({
        userName,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
            message: 'User Registered'
        })
    } else {
        res.status(400).json({message: 'User Registration Failed'})
        return
    }
}


// Login User
// @access Public
const loginUser = async (req, res) => {

    const {email, password} = req.body
    
    // Check user
    const user = await Users.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id),
            message: 'User Successfully Login'
        })
    }   else {
        res.status(400).json({message: 'Invalid Credentials'})
        
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })
}

// Get User
// @access Private
const getUser = async (req, res) => {
    const {_id, userName, email} = await Users.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        userName,
        email
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser
}