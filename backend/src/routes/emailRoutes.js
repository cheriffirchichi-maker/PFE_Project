const express = require("express");
const { sendEmail } = require("../services/emailService");

const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/test",
  verifyToken,
  authorizeRoles("admin", "responsable"),
  async (req, res) => {
    try {
      const { to } = req.body;

      if (!to) {
        return res.status(400).json({
          message: "Email destinataire obligatoire.",
        });
      }

      await sendEmail({
        to,
        subject: "Test Gmail - PFE BI Platform",
        html: `
          <h2>Test Gmail</h2>
          <p>Bonjour,</p>
          <p>Ceci est un email de test envoyé depuis la plateforme PFE BI.</p>
          <p>Votre configuration Gmail fonctionne correctement.</p>
        `,
      });

      res.json({
        message: "Email envoyé avec succès.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de l’envoi de l’email.",
        error: error.message,
      });
    }
  }
);

module.exports = router;