const { Message } = require("../models/Message")
const { User } = require("../models/User")


const messageController = {
    add: async (req, res) => {
        try {
            const newMessage = await Message.create({
                content: req.body.content,
                user: req.body.user,
                receiver: req.body.receiver
            })
            const user = await User.findById(req.body.user)
            await user.updateOne({
                $push: { messages: newMessage._id }
            })
            await user.save()
            const nmsg = await newMessage.populate('user')
            await nmsg.populate('receiver')
            res.status(200).json(nmsg)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error')
        }
    },
    getAllByUserId: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('messages')
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json('Error')
        }
    },
    getAllMessage: async (req, res) => {
        try {
            console.log(req.body.user)
            console.log(req.body.receiver)
            const listMessage = await Message.find({
                $or: [
                    { user: req.body.user, receiver: req.body.receiver },
                    { user: req.body.receiver, receiver: req.body.user }
                ]
            }).populate('user')
            res.status(200).json(listMessage)
        }
        catch (error) {
            console.log(error);

        }
    }
}

module.exports = { messageController }