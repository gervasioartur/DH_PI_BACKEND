require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

//models
const User = require('../models/User');

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');

module.exports = class AuthControllers {
  static async login(req, res) {
    res.headers('Access-Control-Allow-Origin', "*")
    const { email, password } = req.body;

    const user = await User.findOne({
      raw: true,
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword) {
      return res.status(422).json({ message: 'The password is incorrect!' });
    }

    createUserToken(user, req, res);
  }

  static async chekuser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, secret);
      currentUser = await User.findOne({
        raw: true,
        where: { id: decoded.id },
        attributes: { exclude: ['password'] },
      });
      if (!currentUser) {
        return res.status(404).send({ message: 'User not found' });
      }

      return res.status(200).send(currentUser);
    }

    currentUser = null;
    return res.status(404).send({ message: 'User not found' });
  }
};
