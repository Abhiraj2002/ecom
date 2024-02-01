const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: 'User already exist',
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt);

    const userData = {
      name: name,
      email: email,
      password: hashPassword,
    };

    await userModel.create(userData);

    return res.status(200).send({
      success: true,
      message: 'User created sucessfully',
    });
  } catch (error) {
    return res.status(400).send({
      message: 'Error in register controller',
      status: false,
      error,
    });
  }
};
module.exports = registerController;
