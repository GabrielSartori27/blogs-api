require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const secret = `${process.env.JWT_SECRET}`;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const login = async (email, password) => {
    if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { code: 400, message: 'Invalid fields' };
    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return { code: 200, token };
};

// Function "validateEmail" source: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

const validateUser = async (displayName, email, password) => {
    if (displayName.length < 8) {
        return { code: 400, 
               message: '"displayName" length must be at least 8 characters long' }; 
       }
           if (!validateEmail(email)) {
 return { code: 400, 
            message: '"email" must be a valid email' }; 
}
           if (password.length < 6) {
        return { code: 400, 
               message: '"password" length must be at least 6 characters long' }; 
       }
           const user = await User.findOne({ where: { email } });
           if (user) return { code: 409, message: 'User already registered' };
           return { code: false };
}; 

const addUser = async (displayName, email, password, image) => {
    const { code, message } = await validateUser(displayName, email, password);
    if (code) return { code, message }; 
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: { displayName, email } }, secret, jwtConfig);
    return { code: 201, token };
};

const getUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
    if (!users) return { code: 404, message: 'Users not found' };
    return { code: 200, users };
};

const getUserById = async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
    if (!user) return { code: 404, message: 'User does not exist' };
    return { code: 200, user };
};

const deleteUser = async (userId) => {
    await User.destroy({ where: { id: userId } });
    return { code: 204 };
};

module.exports = {
    login,
    addUser,
    getUsers,
    getUserById,
    deleteUser,
};