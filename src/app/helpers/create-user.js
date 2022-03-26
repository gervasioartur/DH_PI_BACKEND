const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { name, email, phone, password } = req.body; //user
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //cheking if user exists
  let checkUser;

  try {
    checkUser = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  } catch (error) {
    console.log(error);
  }
  if (checkUser) {
    return {
      msgType: 'error',
      message: 'Por favor utilize outro email!',
    };
  }

  let user = {};
  if (req.originalUrl === '/admins/register') {
    user = new User({
      name,
      email,
      phone,
      password: passwordHash,
      isAdmin: true,
    });
  } else {
    user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });
  }

  let newUser = {};
  try {
    newUser = await user.save();
    return {
      msgType: 'success',
      user: newUser.dataValues,
    };
  } catch (error) {
    return {
      msgType: 'error',
      message: error,
    };
  }
};
module.exports = createUser;
