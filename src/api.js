const express = require('express');
const UsersController = require('./database/controllers/usersControllers');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

app.post('/login', UsersController.login);
app.post('/user', UsersController.addUser);
app.get('/user', validateJWT, UsersController.getUsers);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
