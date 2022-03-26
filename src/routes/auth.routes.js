const router = require('express').Router();

//controlers
const AuthControllers = require('../app/controllers/AuthControllers');

//middleware
const loginFormValidation = require('../app/middleware/validations/login-form-validation');

router.post('/login', loginFormValidation, AuthControllers.login);
router.get('/chekuser', AuthControllers.chekuser);

module.exports = router;
