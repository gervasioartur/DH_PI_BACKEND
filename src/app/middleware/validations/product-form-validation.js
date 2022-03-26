const validator = require('validator');

const productFormValidation = async (req, res, next) => {
  const { name, price, description, categoriesId } = req.body;

  if (!name) {
    return res.status(422).json({ message: 'Introduza um nome para produto!' });
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
  if (!req.files) {
    return res
      .status(422)
      .json({ message: 'Carregue algumas images do produto!' });
  }

  next();
};

module.exports = productFormValidation;
