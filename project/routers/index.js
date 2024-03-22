const router = require('express').Router()
const todosRouter = require('./todos.router.js');

router.use("/api/todos", todosRouter);

module.exports = router;