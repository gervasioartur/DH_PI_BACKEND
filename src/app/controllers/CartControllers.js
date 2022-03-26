//models
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Customer = require('../models/Customer');
const User = require('../models/User');

//helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class CartControllers {
  static async addProduct(req, res) {
    const { productId } = req.params;

    const product = Product.findByPk(productId);

    if (!product) {
      return res.status(400).json({ message: 'Product not found' });
    }

    //getting the user data
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(400).json({ message: 'You must login first' });
    }

    try {
      const customer = User.findOne({
        raw: true,
        include: { association: 'customer' },
        where: { id: user.id },
      });

      const addToACart = Cart.create({
        customerId: customer.id,
        productId: product.id,
      });

      const addedToACar = await Cart.create({});
    } catch (error) {}
  }
};
