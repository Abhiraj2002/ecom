const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).send({
      sucess: false,
      message: 'User Not Found',
    });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(402).send({
      sucess: false,
      message: 'Invalid Password',
    });
  }
  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
    return res.status(200).json({
      sucess: true,
      message: 'User Logged In',
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  }
};
module.exports = loginController;
