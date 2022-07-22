require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const secret = `${process.env.JWT_KEY}`;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        const user = await User.findOne({ where: { email: decoded.data.email } });
        if (!user) {
            return res
              .status(401)
              .json({ message: 'User not found' });
          }
          req.user = user;
          next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
};
