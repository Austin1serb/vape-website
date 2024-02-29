const express = require('express');
const router = express.Router();
const { addBrand, updateBrand, deleteBrand, getAll, getOne } = require('../controllers/brands.controller'); 


router.get('/', getAll);
router.get('/:id', getOne);



router.post('/', addBrand);
router.put('/:id', updateBrand); 
router.delete('/:id', deleteBrand);





module.exports = router;
