const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Log = require("../models/Log");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { first_name, last_name, email, role, status, password } = req.body;

    const updateData = {
      first_name,
      last_name,
      email,
      role,
      status,
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    await Log.create({
      user_id: req.user.id,
      action: "Modification utilisateur",
      description: `Modification du compte ${user.email}`,
    });

    res.json({
      message: "Utilisateur modifié avec succès.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Vous ne pouvez pas supprimer votre propre compte.",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    await Log.create({
      user_id: req.user.id,
      action: "Suppression utilisateur",
      description: `Suppression du compte ${user.email}`,
    });

    res.json({
      message: "Utilisateur supprimé avec succès.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

const changeUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Statut invalide. Utilisez active ou inactive.",
      });
    }

    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Vous ne pouvez pas désactiver votre propre compte.",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    await Log.create({
      user_id: req.user.id,
      action: "Changement statut utilisateur",
      description: `Statut du compte ${user.email} changé en ${status}`,
    });

    res.json({
      message: "Statut modifié avec succès.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserStatus,
};