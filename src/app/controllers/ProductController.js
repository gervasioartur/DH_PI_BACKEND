const { Op } = require('sequelize');

// //models
const Product = require('../models/Product');
const Category = require('../models/Category');
const Operation = require('../models/Operation');

//helper
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class ProductController {
  static async index(req, res) {
    const products = await Product.findAll({
      raw: true,
      include: { association: 'category' },
    });

    if (products.length == 0) {
      return res.status(404).json({ message: 'Sem produtos cadastrados!' });
    }

    return res.status(200).json({
      message: 'ok',
      products,
    });
  }

  static async store(req, res) {
    const { name, price, description, categoriesId } = req.body;
    let images = req.files;

    //check if the category exists
    const checkCategory = await Category.findOne({
      raw: true,
      where: { id: categoriesId },
    });

    if (!checkCategory) {
      return res.status(403).json({ message: 'Categoria inválida!' });
    }

    const product = new Product({
      name,
      price,
      description,
      categoriesId,
      images: [],
    });
    images.map((image) => {
      product.images.push(image.filename);
    });

    //create a operatin data
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res
        .status(409)
        .json({ message: 'Impossível realizar a oparação!' });
    }

    if (!user.isAdmin) {
      return res.status(409).json({ message: 'Acesso negado!' });
    }

    try {
      const newProduct = await product.save();
      console.log(newProduct.dataValues.id);

      return res.status(201).json({
        message: 'created',
        newProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.toString() });
    }
  }

  static async search(req, res) {
    const search = req.body.search;

    const products = await Product.findAll({
      raw: true,
      include: { association: 'category' },
      where: { name: { [Op.like]: `%${search}%` } },
    });

    if (!products) {
      return res.status(400).json({ message: 'Not found!' });
    }

    if (products.length == 0) {
      return res.status(400).json({ message: 'Not found!' });
    }

    if (!search) {
      return res.status(400).json({ message: 'Not found!' });
    }

    return res.status(200).json({
      message: 'ok',
      resulst: products,
    });
  }

  static async edit(req, res) {
    const id = req.params.id;
    const { name, price, description, categoriesId } = req.body;
    let images = req.files;

    const product = await Product.findOne({
      raw: true,
      where: { id },
    });

    if (!product) {
      return res.status(422).json({ message: 'Product não encontrada' });
    }

    //validations
    if (!name) {
      return res
        .status(422)
        .json({ message: 'Introduza um nome para produto!' });
    }

    if (!price) {
      return res
        .status(422)
        .json({ message: 'Introduza um preço para o produto!' });
    }

    if (!description) {
      return res
        .status(422)
        .json({ message: 'Introduza uma descrição do produto!' });
    }

    if (!categoriesId) {
      return res
        .status(422)
        .json({ message: 'Introduza uma categoria para o produto!' });
    }

    if (images.length == 0) {
      return res
        .status(422)
        .json({ message: 'Carregue algumas images do produto!' });
    }

    //check if the category exists
    const checkCategory = await Category.findOne({
      raw: true,
      where: { id: categoriesId },
    });
    if (!checkCategory) {
      return res.status(403).json({ message: 'Categoria inválida!' });
    }
    const imagesAux = [];

    images.map((image) => {
      imagesAux.push(image.filename);
    });

    try {
      await Product.update(
        {
          name,
          price,
          description,
          categoriesId,
          images: imagesAux,
        },
        { where: { id } }
      );
      return res.status(200).json({
        message: 'Produto atualizada com sucesso!',
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    const product = await Product.findOne({
      raw: true,
      where: { id },
    });

    if (!product) {
      return res
        .status(403)
        .json({ message: 'Produto não cadastrada no sistema!' });
    }

    try {
      await Product.destroy({ where: { id } });
      return res.status(200).json({
        message: 'Produto removido com sucesso!',
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
