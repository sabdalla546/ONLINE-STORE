const catchAsync = require('../utilts/catchAsync');
const AppError = require('../utilts/appError');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Cart = require('../model/cardModel');

const validateMongoId = require('../utilts/validateMongoId');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
// get all users
exports.getAllUsers =  catchAsync(async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        data: users
    });
});
// get single user
exports.getSingleUser =  catchAsync(async (req,res,next)=>{
    const {id }= req.params;
    validateMongoId(id);
    const user = await User.findOne({_id:id});
    if(!user){
        return next(new AppError("user not exist",404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
});
exports.updateMe = catchAsync(async(req,res,next)=>{
    // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // req.body.role = 'admin
  const filteredBody = filterObj(req.body, 'name', 'email');
  //Filtered out unwanted fields names that are not allowed to be updated
  const updateUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{
    new: true,
    runValidators: true
  });

  res.status(200).json({
    message: 'success',
    data:{
        user: updateUser
    }
  });
})
exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
exports.deleteUser =  catchAsync(async (req,res,next)=>{
    const {id }= req.params;
    validateMongoId(id);
    const user = await User.deleteOne({_id:id});
    if(!user){
        return next(new AppError("user not exist",404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
});
exports.updateUser =  catchAsync(async (req,res,next)=>{
    const {_id }= req.user;
    validateMongoId(_id);
    const user = await User.findByIdAndUpdate(_id,{
        name: req?.body?.name,
        email: req?.body?.email,

    },{
        new:true
    });
    if(!user){
        return next(new AppError("user not exist",404));
    }
    res.status(200).json({
        status: 'success',
        data: user
    });
});


/*exports.updatePassword = catchAsync(async(req,res,next)=>{
    const _id = req.params.id;
    const user = await User.findOne({_id:_id}).select("+password");
    if(!(user.correctPassword(req.body.passwordConfirm, user.password))){
        return next(new AppError("password wrong",400));
    }
    

});*/
exports.getWishList = catchAsync(async (req,res,next)=>{
    const { _id } = req.user;
    const findUser = await User.findById(_id).populate("wishList");
    console.log(findUser);
    if(!findUser){
        return next(new AppError("user not exist",404));
    }
    res.json(findUser);
});

exports.saveAddress = catchAsync(async(req,res,next)=>{
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          address: req?.body?.address,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
});
 exports.userCart = catchAsync(async (req, res,next) => {
    const { cart } = req.body;
    const { _id } = req.user;
    //validateMongoDbId(_id);
      let products = [];
      const user = await User.findById(_id);
      // check if user already have product in cart
      const alreadyExistCart = await Cart.findOne({ orderby: user._id });
      if (alreadyExistCart) {
        alreadyExistCart.remove();
      }
      for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        console.log(cart[i]._id)
        object.count = cart[i].count;
        //object.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        console.log(getPrice)
        object.price = getPrice.price;
        products.push(object);
      }
      console.log(products)
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      let newCart = await new Cart({
        products,
        cartTotal,
        orderby: user?._id,
      }).save();

      res.json(newCart);
   
  });
  
exports.blockUser= catchAsync(async(req,res,next)=>{
    const _id = req.params.id;
    validateMongoId(_id);
   // console.log(_id)
    const blockUser = await User.findByIdAndUpdate(_id,{
        isBlocked : true
    },
    {
        new: true
    });
    //console.log(blockUser)
    if(!blockUser) {
        return next(new AppError("user not exist",404));
    }
    res.status(200).json({
        message: 'user blocked',
    })
});


exports.unBlokUser= catchAsync(async(req,res,next)=>{
    const _id = req.params.id;
    validateMongoId(_id);
    const UnBlockUser = await User.findByIdAndUpdate(_id,{
        isBlocked : false
    },
    {
        new: true
    });
    if(!UnBlockUser) {
        return next(new AppError("user not exist",404));
    }
    res.status(200).json({
        message: 'user unblocked',
    })
});
