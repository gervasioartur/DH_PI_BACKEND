const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//models
const User = require('../models/User');
const Address = require('../models/Address');
const Customer = require('../models/Customer');

//helpers
const createUserToken = require('../helpers/create-user-token');

//helper
const createUser = require('../helpers/create-user');

module.exports = class CustomerController {
  static async index(req, res) {
    const customers = await Customer.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });

    if (customers.length == 0) {
      return res.status(400).json({ message: 'Nothing to show!' });
    }

    return res.status(200).json({
      message: 'ok',
      customers,
    });
  }

  static async register(req, res) {
    const { number, street, district, city, zipcode } = req.body; //adress
    const result = await createUser(req, res);

    if (result.msgType == 'error') {
      return res.status(500).json({ message: result.message });
    }

    const user = result.user;

    //creating address with user id
    let address = {};
    address = new Address({
      number,
      street,
      district,
      city,
      zipcode,
      complement: '',
    });

    if (req.body.complement) {
      address.complement = req.body.complement;
    }

    let newAddress = {};
    try {
      newAddress = await address.save();
    } catch (error) {
      return res.status(500).json({ mesasge: error });
    }

    //creating a custumer
    let customer = new Customer({
      userId: user.id,
      addressId: newAddress.id,
    });

    try {
      const newCustomer = await customer.save();
      createUserToken(newCustomer, req, res);
    } catch (error) {
      return res.status(500).json({ mesasge: error });
    }
  }
};
