const express = require("express");
const { predictDelai } = require("../controllers/predictionController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/delai",
  verifyToken,
  authorizeRoles("admin", "responsable", "employe"),
  predictDelai
);

module.exports = router;