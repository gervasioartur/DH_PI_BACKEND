const router = require('express').Router();

//controlers
const AdminController = require('../app/controllers/AdminController');

//middleawares
const registerFormValidation = require('../app/middleware/validations/register-form-validations');
const verifyAdminToken = require('../app/helpers/verify-token-admin');

router.get('/', verifyAdminToken, AdminController.index);
router.post('/register', registerFormValidation, AdminController.register);
router.get('/search', verifyAdminToken, AdminController.search);

module.exports = router;
