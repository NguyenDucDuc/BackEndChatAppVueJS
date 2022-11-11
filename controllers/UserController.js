const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config()

const userController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            const newUser = await User.create({
                username: req.body.username,
                password: hashed,
            })
            await newUser.save()
            res.status(200).json(newUser)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error');
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (user && validPass) {
                const accessToken = await jwt.sign({
                    id: user._id
                }, process.env.secret_key)
                return res.status(200).json({accessToken, user})
            }else {
                return res.status(400).json('User is not valid')
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Error')
        }
    },
    currentUser: async (req,res) => {
        try {
            const user = await User.findById(req.userId)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error')
        }
    },
    getAllUser: async (req, res) => {
        try {
            const allUser = await User.find()
            res.status(200).json(allUser)
        } catch (error) {
            console.log(error);
            res.status(500).json('Error')
        }
    },
    getUserById: async (req,res) => {
        try {
            const user = await User.findById(req.params.userId)
            res.status(200).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json('Error');
        }
    }
}


module.exports = { userController }