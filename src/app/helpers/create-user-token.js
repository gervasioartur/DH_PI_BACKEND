require('dotenv/config');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    secret
  );
  res.status(200).json({
    message: 'Você esta logado!',
    token,
    userId: user.id,
    isAdmin: user.isAdmin,
  });
};

module.exports = createUserToken;
