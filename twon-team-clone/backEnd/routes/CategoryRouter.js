const express = require('express');
const categoryController = require('../controller/categoryController');

const router= express.Router();

router.post('/',categoryController.createCategory);
router.get('/',categoryController.getAllCategory);
router.put('/:id',categoryController.updateCategory)
     .delete('/:id',categoryController.deletCategory)
     .get('/:id',categoryController.getSingleCategory);

module.exports = router;