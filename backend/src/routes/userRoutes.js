const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserStatus,
} = require("../controllers/userController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(verifyToken);

router.get("/", authorizeRoles("admin"), getAllUsers);
router.get("/:id", authorizeRoles("admin"), getUserById);
router.put("/:id", authorizeRoles("admin"), updateUser);
router.delete("/:id", authorizeRoles("admin"), deleteUser);
router.put("/:id/status", authorizeRoles("admin"), changeUserStatus);

module.exports = router;