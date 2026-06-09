const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "responsable", "employe"],
      default: "employe",
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive", "rejected"],
      default: "pending",
},
    email_verified: {
      type: Boolean,
      default: false,
    },
    otp_code: {
      type: String,
      default: null,
    },
    otp_expires: {
      type: Date,
      default: null,
    },
    last_login: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);