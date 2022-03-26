const validator = require('validator');

const loginFormValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: 'Por favor introduza o email!' });
  } else if (!validator.isEmail(email)) {
    return res.status(422).json({ message: 'Email inválido!' });
  }

  if (!password) {
    return res.status(422).json({ message: 'Por favor introduza a senha!' });
  }

  next();
};

module.exports = loginFormValidation;
