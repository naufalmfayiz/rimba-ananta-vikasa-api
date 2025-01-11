const express = require("express");
const UserController = require("../controllers/userController");
const logMiddleware = require("../middlewares/logger");
const router = express.Router();

router.use(logMiddleware);
router.post("/", UserController.addUser);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
