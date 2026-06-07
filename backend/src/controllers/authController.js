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

    // Autoriser seulement employe ou responsable à l'inscription normale
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

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: role || "employe",
    });

    await Log.create({
      user_id: user._id,
      action: "Création utilisateur",
      description: `Création du compte ${user.email}`,
    });

    // Email de bienvenue à l'utilisateur inscrit
    await sendEmail({
      to: user.email,
      subject: "Bienvenue sur PFE BI Platform",
      html: `
        <h2>Bienvenue ${user.first_name} ${user.last_name}</h2>
        <p>Votre compte a été créé avec succès.</p>
        <p>Vous pouvez maintenant accéder à la plateforme décisionnelle.</p>
        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Rôle :</strong> ${user.role}</p>
      `,
    });

    // Email de notification à l'admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Nouvelle inscription sur PFE BI Platform",
      html: `
        <h2>Nouvelle inscription</h2>
        <p>Un nouveau compte vient d'être créé sur la plateforme.</p>
        <p><strong>Nom :</strong> ${user.first_name} ${user.last_name}</p>
        <p><strong>Email :</strong> ${user.email}</p>
        <p><strong>Rôle :</strong> ${user.role}</p>
        <p><strong>Date :</strong> ${new Date().toLocaleString("fr-FR")}</p>
      `,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès. Un email a été envoyé.",
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

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Compte désactivé. Contactez l’administrateur.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
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
        expiresIn: process.env.JWT_EXPIRES_IN,
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
};