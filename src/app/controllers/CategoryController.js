//models
const Category = require('../models/Category');

module.exports = class CategoryController {
  static async index(req, res) {
    const categories = await Category.findAll({ raw: true });
    if (categories.length == 0) {
      return res
        .status(404)
        .json({ message: "There's categories in the sistem" });
    }
    return res.status(200).json({
      message: 'ok',
      categories,
    });
  }

  static async store(req, res) {
    const name = req.body.name;

    const category = new Category({
      name,
    });

    //chekking if exists
    const checkCategory = await Category.findOne({
      raw: true,
      where: { name },
    });

    if (checkCategory) {
      return res.status(403).json({ message: 'This category alread exists!' });
    }

    try {
      const newCategory = await category.save();
      return res.status(201).json({
        message: 'ok',
        newCategory,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async edit(req, res) {
    const id = req.params.id;
    const name = req.body.name;

    const category = await Category.findOne({
      raw: true,
      where: { id },
    });

    if (!category) {
      return res.status(422).json({ message: 'Category not found' });
    }

    if (!name) {
      return res.status(422).json({ message: 'Give a name to category' });
    }

    //chekking if exists
    const checkCategory = await Category.findOne({
      raw: true,
      where: { name },
    });

    if (checkCategory) {
      return res.status(403).json({ message: 'This category alread exists!' });
    }

    try {
      await Category.update({ name }, { where: { id } });
      return res.status(200).json({
        message: 'updated!',
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req, res) {
    const id = req.params.id;

    const category = await Category.findOne({
      raw: true,
      where: { id },
    });

    if (!category) {
      return res.status(403).json({ message: 'Category not found!' });
    }

    try {
      await Category.destroy({ where: { id } });
      return res.status(200).json({
        message: 'Category removed!',
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
