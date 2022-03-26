const validator = require('validator');

const categoryFormValidation = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(422)
      .json({ message: 'Introduza um nome para categoria' });
  }
  next();
};

module.exports = categoryFormValidation;
