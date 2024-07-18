const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories.controller');
const { verifyToken, isAdmin } = require('../verifyToken'); // Import your verifyToken middleware

router.get('/', categoryController.getAll);
//router.use(verifyToken);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.deleteOne);

module.exports = router;
