const router = require('express').Router();
//controller
const CategoryController = require('../app/controllers/CategoryController');

//helpers
const verifyTkenAdmin = require('../app/helpers/verify-token-admin');

//middleware
const categoryFormValidation = require('../app/middleware/validations/category-form-validation');

router.get('/', CategoryController.index);
router.post(
  '/store',
  verifyTkenAdmin,
  categoryFormValidation,
  CategoryController.store
);
router.patch('/edit/:id', verifyTkenAdmin, CategoryController.edit);
router.delete('/delete/:id', verifyTkenAdmin, CategoryController.delete);

module.exports = router;
