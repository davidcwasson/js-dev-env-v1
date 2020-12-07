const express = require('express');
const todoController = require('../controllers/todoController');

const todoRouter = express.Router();

const { getIndex, getById } = todoController();

todoRouter.route('/')
  .get(getIndex);

todoRouter.route('/:id')
  .get(getById);

module.exports = todoRouter;
