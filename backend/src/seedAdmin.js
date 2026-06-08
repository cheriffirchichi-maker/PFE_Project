require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.findOneAndUpdate(
      { email: "admin@gmail.com" },
      {
        first_name: "Admin",
        last_name: "Principal",
        email: "cheriffirchichi@gmail.com",
        password: "$2a$12$rNCWVBRnP3TWjnWq/nzaReqmHhbciYMEZ/4aBeIXPdlo1zomLD5I6",
        role: "admin",
        status: "active",
        email_verified: true,
        otp_code: null,
        otp_expires: null,
      },
      { new: true }
    );

    console.log("Compte admin changé vers cheriffirchichi@gmail.com");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();