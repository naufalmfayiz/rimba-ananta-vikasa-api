const express = require("express");
const UserController = require("../controllers/userController");
const logMiddleware = require("../middlewares/logger");
const validateInput = require("../middlewares/validateInput");

const router = express.Router();

router.use(logMiddleware);
router.post("/", validateInput, UserController.addUser);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", validateInput, UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
