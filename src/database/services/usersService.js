require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const login = async (email, password) => {
    if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { code: 400, message: 'Invalid fields' };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return { code: 200, token };
};

module.exports = {
    login,
};