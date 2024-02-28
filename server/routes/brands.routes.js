const express = require('express');
const router = express.Router();
const { addBrand, updateBrand, deleteBrand } = require('../controllers/brands.controller'); 

router.post('/', addBrand);

router.put('/:id', updateBrand); 

router.delete('/:id', deleteBrand);


module.exports = router;
