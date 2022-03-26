const router = require('express').Router();

//controlers
const CustomerController = require('../app/controllers/CustomerController');

//middleawares
const registerFormValidation = require('../app/middleware/validations/register-form-validations');
const customerRegisterFormValidation = require('../app/middleware/validations/custumer-register-form-validations');

router.get('/', CustomerController.index);
router.post(
  '/register',
  registerFormValidation,
  customerRegisterFormValidation,
  CustomerController.register
);

module.exports = router;
