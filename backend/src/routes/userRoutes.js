const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserStatus,
  approveUser,
  rejectUser,
} = require("../controllers/userController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Toutes les routes utilisateurs nécessitent un token
router.use(verifyToken);

// Afficher tous les utilisateurs
router.get("/", authorizeRoles("admin"), getAllUsers);

// Afficher un utilisateur par ID
router.get("/:id", authorizeRoles("admin"), getUserById);

// Modifier un utilisateur
router.put("/:id", authorizeRoles("admin"), updateUser);

// Supprimer un utilisateur
router.delete("/:id", authorizeRoles("admin"), deleteUser);

// Activer / désactiver un compte
router.put("/:id/status", authorizeRoles("admin"), changeUserStatus);

// Approuver une inscription
router.put("/:id/approve", authorizeRoles("admin"), approveUser);

// Refuser une inscription
router.put("/:id/reject", authorizeRoles("admin"), rejectUser);

module.exports = router;