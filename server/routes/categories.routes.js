const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories.controller');

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.deleteOne);

module.exports = router;
