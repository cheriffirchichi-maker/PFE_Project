const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Log = require("../models/Log");
const { sendEmail } = require("../services/emailService");

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs obligatoires doivent être remplis.",
      });
    }

    const allowedRoles = ["employe", "responsable"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Rôle invalide. Vous pouvez choisir employe ou responsable.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || "employe",

      // Vérification email
      email_verified: false,
      otp_code: otpCode,
      otp_expires: otpExpires,

      // Sécurité : compte non actif après inscription
      status: "pending",
    });

    await Log.create({
      user_id: user._id,
      action: "Création utilisateur",
      description: `Création du compte ${user.email} avec statut pending`,
    });

    await sendEmail({
      to: user.email,
      subject: "Code de vérification - PFE BI Platform",
      html: `
        <h2>Vérification de votre email</h2>
        <p>Bonjour ${user.first_name} ${user.last_name},</p>

        <p>Votre compte a été créé avec succès.</p>

        <p>Veuillez utiliser le code suivant pour vérifier votre adresse email :</p>

        <h1 style="letter-spacing: 4px; color: #5f00b5;">${otpCode}</h1>

        <p>Ce code est valable pendant 10 minutes.</p>

        <p>
          Après la vérification de votre email, votre compte restera en attente
          jusqu’à l’approbation par l’administrateur.
        </p>
      `,
    });

    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "Nouvelle inscription en attente d’approbation",
        html: `
          <h2>Nouvelle inscription</h2>

          <p>Un nouveau compte vient d'être créé sur la plateforme.</p>

          <p><strong>Nom :</strong> ${user.first_name} ${user.last_name}</p>
          <p><strong>Email :</strong> ${user.email}</p>
          <p><strong>Rôle demandé :</strong> ${user.role}</p>
          <p><strong>Email vérifié :</strong> Non</p>
          <p><strong>Statut du compte :</strong> En attente d’approbation</p>

          <p>
            Veuillez vous connecter à l’espace administrateur pour approuver
            ou refuser cette inscription.
          </p>
        `,
      });
    }

    return res.status(201).json({
      message:
        "Compte créé avec succès. Un code OTP a été envoyé par email. Après vérification, votre compte devra être approuvé par l’administrateur.",
      email: user.email,
      status: user.status,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp_code } = req.body;

    if (!email || !otp_code) {
      return res.status(400).json({
        message: "Email et code OTP obligatoires.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    if (user.email_verified) {
      return res.status(400).json({
        message: "Cet email est déjà vérifié.",
      });
    }

    if (user.otp_code !== otp_code) {
      return res.status(400).json({
        message: "Code OTP incorrect.",
      });
    }

    if (!user.otp_expires || user.otp_expires < new Date()) {
      return res.status(400).json({
        message: "Code OTP expiré. Veuillez demander un nouveau code.",
      });
    }

    user.email_verified = true;
    user.otp_code = null;
    user.otp_expires = null;

    await user.save();

    await Log.create({
      user_id: user._id,
      action: "Vérification email",
      description: `Email vérifié pour le compte ${user.email}`,
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Email utilisateur vérifié",
      html: `
        <h2>Email vérifié</h2>
        <p>L'utilisateur suivant a vérifié son adresse email :</p>
        <p><strong>Nom :</strong> ${user.first_name} ${user.last_name}</p>
        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Rôle :</strong> ${user.role}</p>
      `,
    });

    return res.json({
      message: "Email vérifié avec succès. Vous pouvez maintenant vous connecter.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email obligatoire.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    if (user.email_verified) {
      return res.status(400).json({
        message: "Cet email est déjà vérifié.",
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp_code = otpCode;
    user.otp_expires = otpExpires;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Nouveau code de vérification - PFE BI Platform",
      html: `
        <h2>Nouveau code OTP</h2>
        <p>Bonjour ${user.first_name},</p>
        <p>Votre nouveau code de vérification est :</p>
        <h1 style="letter-spacing: 4px;">${otpCode}</h1>
        <p>Ce code est valable pendant 10 minutes.</p>
      `,
    });

    return res.json({
      message: "Nouveau code OTP envoyé avec succès.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe sont obligatoires.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    if (!user.email_verified) {
      return res.status(403).json({
        message: "Veuillez vérifier votre adresse email avant de vous connecter.",
      });
    }

    if (user.status === "pending") {
      return res.status(403).json({
        message:
          "Votre compte est en attente d’approbation par l’administrateur.",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        message: "Votre demande d’inscription a été refusée.",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Votre compte est désactivé. Contactez l’administrateur.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Statut du compte invalide. Contactez l’administrateur.",
      });
    }

    user.last_login = new Date();
    await user.save();

    await Log.create({
      user_id: user._id,
      action: "Connexion",
      description: "Connexion réussie à la plateforme",
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    return res.json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        status: user.status,
        email_verified: user.email_verified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  verifyOtp,
  resendOtp,
};