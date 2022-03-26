require('dotenv/config');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//get user by token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }
  const decoded = jwt.verify(token, secret);
  const userId = decoded.id;
  const user = await User.findOne({
    raw: true,
    where: { id: userId },
    attributes: { exclude: ['password'] },
  });
  return user;
};

module.exports = getUserByToken;
