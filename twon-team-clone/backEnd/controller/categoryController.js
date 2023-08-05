const Category = require('../model/categoryModel');
const AppError = require('../utilts/appError');
const catchAsync = require('../utilts/catchAsync');

exports.createCategory = catchAsync(async(req,res,next)=>{
    const newCategory = await Category.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
          Category: newCategory,
        }
      });
});

exports.updateCategory= catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        category
      }
    });
  });
  
  exports.deletCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
  
    if (!category ) {
      return next(new AppError('No category found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.getAllCategory =  catchAsync(async (req,res,next)=>{
    const categores = await Category.find();
    res.status(200).json({
        status: 'success',
        data: categores
    });
});
  exports.getSingleCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
  
    if (!category) {
      return next(new AppError('No category found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        category
      }
    });
  });
