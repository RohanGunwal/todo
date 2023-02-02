const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User doesn't exists");

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new Error("Incorrect Password");

    const token = `Bearer ${createToken(user._id)}`;

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ LoginError: err.message });
  }
};
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      throw new Error("All fields are required");

    if (!validator.isEmail(email)) throw new Error("Invalid Email Address");

    if (!validator.isStrongPassword(password))
      throw new Error("Password is not strong");

    const exists = await User.findOne({ email });
    if (exists) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    const token = `Bearer ${createToken(user._id)}`;

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ RegisterError: err.message });
  }
};

module.exports = {
  login,
  register,
};
