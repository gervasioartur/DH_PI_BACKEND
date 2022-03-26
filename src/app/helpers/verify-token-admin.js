require('dotenv/config');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const getToken = require('./get-token');

const checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso nagado!' });
  }
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Acesso nagado!' });
  }

  try {
    const verifiedUserWihthJwt = await jwt.verify(token, secret);

    const user = await User.findOne({
      raw: true,
      where: { id: verifiedUserWihthJwt.id },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválida!' });
    } else if (user.isAdmin == 1) {
      return next();
    }

    return res.status(401).json({ message: 'Acesso nagado!' });
  } catch (error) {
    return res.status(400).json({ message: 'Token inválida!' });
  }
};

module.exports = checkToken;
