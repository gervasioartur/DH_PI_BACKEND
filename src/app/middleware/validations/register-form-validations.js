const validator = require('validator');

const registerFormValidation = async (req, res, next) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(422).json({ message: 'O campo nome é requirido!' });
  } else {
    const newName = name.split(' ').join('');
    if (newName.length < 4) {
      return res.status(422).json({ message: 'O nome é muito curto!' });
    }
  }

  if (!email) {
    return res.status(422).json({ message: 'O campo email é requirido!' });
  } else if (!validator.isEmail(email)) {
    return res.status(422).json({ message: 'Email inválido!' });
  }

  if (!phone) {
    return res.status(422).json({ message: 'O campo celular é requirido!' });
  } else if (!validator.isMobilePhone(phone)) {
    return res.status(422).json({ message: 'Nr de celular inválido!' });
  }

  if (!password) {
    return res.status(422).json({ message: 'O campo senha é requirido!' });
  } else {
    const newPassword = password.split(' ').join('');
    if (newPassword.length < 6) {
      return res.status(422).json({ message: 'A senha é muito curta!' });
    }
  }

  if (password != confirmPassword) {
    return res.status(422).json({ message: 'As senhas conscidem!' });
  }

  next();
};

module.exports = registerFormValidation;
