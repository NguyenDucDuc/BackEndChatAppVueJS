const { messageController } = require('../controllers/MessageController')

const messageRoute = require('express').Router()

messageRoute.post('/message/add', messageController.add)
messageRoute.get('/message/get-all/:id', messageController.getAllByUserId)
messageRoute.post('/message/get-all-message', messageController.getAllMessage)

module.exports = {messageRoute}