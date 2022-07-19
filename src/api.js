const express = require('express');
const UsersController = require('./database/controllers/usersControllers');

// ...

const app = express();

app.use(express.json());

app.post('/login', UsersController.login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
