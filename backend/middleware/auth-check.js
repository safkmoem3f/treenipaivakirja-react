const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw error;
        }
        const decodedToken = jwt.verify(token, 'testisalasana');
        req.userData = {username: decodedToken.username};
        next();
    } catch (error) {
        return error;
    }
};
