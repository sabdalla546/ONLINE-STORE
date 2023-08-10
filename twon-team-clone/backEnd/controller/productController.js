const Product = require('../model/productModel');
const AppError = require('../utilts/appError');
const catchAsync = require('../utilts/catchAsync');
const User = require('../model/userModel');

exports.createProduct = catchAsync(async(req,res,next)=>{
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
          product: newProduct,
        }
      });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
   //const products =await Product.find();
   // filtering
   const queryObj = { ...req.query};
   const excludedFields = ['page', 'sort', 'limit', 'fields'];
   excludedFields.forEach(el => delete queryObj[el]);
  console.log(queryObj);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  let query =Product.find(JSON.parse(queryStr));
  
// sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query= query.sort(sortBy);
  }else {
    query = query.sort('-createdAt');
  }
  // limiting
  if(req.query.fields){
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  }else {
     query= query.select('-__v');
  }
  // pagenation
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 15;
  const skip = (page - 1) * limit;
  console.log(skip)
  query = query.skip(skip).limit(limit);
  if (req.query.page){
    const productCount =await Product.countDocuments();
    if(skip >= productCount) return next(new AppError("page not exist",404));
  }

  const products = await query;
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product ) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.addToWishList = catchAsync(async(req,res,next)=>{
  const { _id } = req.user;
  const { prodId } = req.body;
  console.log(prodId)
  const user = await User.findById(_id);
  if(!user){
    return next(new AppError('No user found with that ID', 404));
  }
  const alreadyadded = user.wishList.find((id) => id.toString() === prodId);
  if (alreadyadded) {
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { wishList: prodId },
      },
      {
        new: true,
      }
    );
    res.json(user);
  } else {
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { wishList: prodId },
      },
      {
        new: true,
      }
    );
    res.json(user);
  }

});
exports.rating = catchAsync(async(req,res,next)=>{
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  const product = await Product.findById(prodId);
  if(!product){
    return next(new AppError('No product found with that ID', 404));
  }
  let alreadyRated = product.ratings.find(
    (userId) => userId.postedBy.toString() === _id.toString());

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      res.send(updateRating);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        {
          new: true,
        });
        
      }
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);
      
      
});