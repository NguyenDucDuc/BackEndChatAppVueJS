const { middleWare } = require('../controllers/MiddleWare')
const { userController } = require('../controllers/UserController')

const userRoute = require('express').Router()

userRoute.post('/user/register', userController.register)
userRoute.post('/user/login', userController.login)
userRoute.get('/user/current-user', middleWare.verifyToken, userController.currentUser)
userRoute.get('/user/get-all', userController.getAllUser)
userRoute.get('/user/get-user-by-id/:userId', userController.getUserById)


module.exports = {userRoute}