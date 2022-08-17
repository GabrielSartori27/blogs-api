const express = require('express');
const UsersController = require('./database/controllers/usersControllers');
const CategoriesController = require('./database/controllers/categoriesControllers');
const BlogPostsController = require('./database/controllers/blogPostsControllers');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

app.post('/login', UsersController.login);
app.post('/user', UsersController.addUser);
app.get('/user', validateJWT, UsersController.getUsers);
app.get('/user/:id', validateJWT, UsersController.getUserById);
app.post('/categories', validateJWT, CategoriesController.addCategory);
app.get('/categories', validateJWT, CategoriesController.getCategories);
app.get('/post', validateJWT, BlogPostsController.getPosts);
app.get('/post/:id', validateJWT, BlogPostsController.getPostById);
app.post('/post', validateJWT, BlogPostsController.addPost);
app.put('/post/:id', validateJWT, BlogPostsController.updatePost);
app.delete('/post/:id', validateJWT, BlogPostsController.deletePost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
