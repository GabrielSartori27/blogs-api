const UsersServices = require('../services/usersService');

const login = async (req, res) => {
    const { email, password } = req.body;
    const { code, message, token } = await UsersServices.login(email, password);
    if (message) return res.status(code).json({ message });
    return res.status(code).json({ token });
};

module.exports = {
    login,
};