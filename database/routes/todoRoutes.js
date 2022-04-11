const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getAllTodos);
router.get('/todos/:todoId', todoController.getTodo);
router.post('/todos', todoController.createTodo);
router.patch('/todos/:todoId', todoController.updateTodo);
router.delete('/todos/:todoId', todoController.deleteTodo);

module.exports = router;

