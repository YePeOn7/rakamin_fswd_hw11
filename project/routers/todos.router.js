const router = require('express').Router()

const routerController = require('../controllers/todos.controller.js');

router.get("/", routerController.findAll);
router.get("/:id", routerController.findOne);
router.post("/", routerController.create);
router.put("/", routerController.update);
router.delete("/", routerController.delete);

module.exports = router;