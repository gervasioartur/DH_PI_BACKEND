const { Op } = require('sequelize');

const createUserToken = require('../helpers/create-user-token');

//models
const Admin = require('../models/Admin');
const User = require('../models/User');

//helpers
const createUser = require('../helpers/create-user');

module.exports = class AdminController {
  static async index(req, res) {
    const admins = await Admin.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });

    if (admins.length == 0) {
      return res
        .status(404)
        .json({ message: 'It seams that the database is empty!' });
    }

    return res.status(200).json({
      message: 'ok',
      admins,
    });
  }

  static async register(req, res) {
    const result = await createUser(req, res);

    if (result.msgType == 'error') {
      return res.status(500).json({ message: result.message });
    }

    const user = result.user;

    //creating a admin user
    let admin = new Admin({
      userId: user.id,
    });

    const newAdmin = await admin.save();
    createUserToken(newAdmin, req, res);
  }

  static async search(req, res) {
    const search = req.body.search;

    const admins = await Admin.findAll({
      raw: true,
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
        where: { name: { [Op.like]: `%${search}%` } },
      },
    });

    if (!admins || admins.length == 0 || !search) {
      return res.status(400).json({ message: 'Not found!' });
    }

    return res.status(200).json({
      message: 'ok',
      resulst: admins,
    });
  }
};
