const UsersServices = require('../services/usersService');

const login = async (req, res) => {
    const { email, password } = req.body;
    const { code, message, token } = await UsersServices.login(email, password);
    if (message) return res.status(code).json({ message });
    return res.status(code).json({ token });
};

const addUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const { code, message, token } = await UsersServices
    .addUser(displayName, email, password, image);
    if (message) return res.status(code).json({ message });
    return res.status(code).json({ token });
};

const getUsers = async (req, res) => {
    const { code, message, users } = await UsersServices.getUsers();
    if (message) return { code, message };
    return res.status(code).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const { code, message, user } = await UsersServices.getUserById(id);
    if (message) return res.status(code).json({ message });
    return res.status(code).json(user); 
};

module.exports = {
    login,
    addUser,
    getUsers,
    getUserById,
};