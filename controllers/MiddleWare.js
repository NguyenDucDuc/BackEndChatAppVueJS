const jwt = require('jsonwebtoken');
require('dotenv').config();

const middleWare = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.token;
            const accessToken = token.split(' ')[1]
            if (accessToken) {
                jwt.verify(accessToken, process.env.secret_key, (err, decode) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json('Access token is not valid')
                    }
                    if (decode) {
                        req.userId = decode.id;
                        next()
                    }
                })
            }
        } catch (error) {
            console.log(error)
            return res.this.status(500).json('Error')
        }
    }
}

module.exports = { middleWare }