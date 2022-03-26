const validator = require('validator');

const registerFormValidation = async (req, res, next) => {
  const { number, street, district, city, zipcode } = req.body;

  if (!street) {
    return res
      .status(422)
      .json({ message: 'O campo rua ou avenida é requirido!' });
  }

  if (!number) {
    return res.status(422).json({ message: 'Preencha o número da da casa!' });
  }

  if (!district) {
    return res.status(422).json({ message: 'Preencha o bairro!' });
  }

  if (!city) {
    return res.status(422).json({ message: 'Preencha a cidade!' });
  }

  if (!zipcode) {
    return res.status(422).json({ message: 'Preencha o zipcode!' });
  } else if (!validator.isPostalCode(zipcode, ['BR'])) {
    return res.status(422).json({ message: 'zipcode inválido!' });
  }

  next();
};

module.exports = registerFormValidation;
