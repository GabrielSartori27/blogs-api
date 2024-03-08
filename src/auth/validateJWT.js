require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = `${process.env.JWT_SECRET}`;

module.exports = async (req, res, next) => {
    const extractToken = (bearerToken) => bearerToken.split(' ')[1];
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({ message: 'Token not found' });
      }
    try {
        const token = extractToken(bearerToken);
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ where: { email: decoded.data.email } });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
          req.user = user;
          next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
};
