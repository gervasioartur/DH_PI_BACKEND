const router = require('express').Router();
//controller
const ProductController = require('../app/controllers/ProductController');

//helpers
const verifyTkenAdmin = require('../app/helpers/verify-token-admin');

//middleware
const productFormValidation = require('../app/middleware/validations/product-form-validation');
const { imageUpload } = require('../app/middleware/image-upload');

router.get('/', ProductController.index);
router.post(
  '/store',
  verifyTkenAdmin,
  imageUpload.array('images'),
  productFormValidation,
  ProductController.store
);
router.patch(
  '/edit/:id',
  verifyTkenAdmin,
  imageUpload.array('images'),
  ProductController.edit
);
router.get('/search', ProductController.search);
router.delete('/delete/:id', verifyTkenAdmin, ProductController.delete);

module.exports = router;
