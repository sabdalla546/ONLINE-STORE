const User = require('../model/userModel');
const catchAsync = require('../utilts/catchAsync');
const AppError = require('../utilts/appError');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utilts/email');
const crypto = require('crypto');

const generateToken = id =>{
    return jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
      });
}

const createSendToken = (user,statusCode,res)=>{
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIEEXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  //remove password from output
  user.password = undefined;
  res.cookie('jwt',token,cookieOptions);
   res.status(statusCode).json({
        status: 'success',
         token,
        data:{
          user,
        }
    })
}
exports.signUp = catchAsync(async(req ,res,next)=> {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    createSendToken(newUser, 201,res);
});

exports.login = catchAsync(async (req,res,next)=>{
    const {email , password } = req.body;
    if (!email || !password){
        return next(new AppError('pls provide email and password',400))
    }
    const user =await User.findOne({email}).select("+password");
    if(!user || !(await user.correctPassword(password , user.password))){
        return next(new AppError('incorrect email or password', 401));
    }
   createSendToken(user, 200,res);
}); 
// admin login
exports.loginAdmin = catchAsync(async (req,res,next)=>{
  const {email , password } = req.body;
  if (!email || !password){
      return next(new AppError('pls provide email and password',400))
  }
  const admin =await User.findOne({email}).select("+password");
  console.log(admin.role)
  if(admin.role !== 'admin' && admin.role !== 'super admin'){
    return next(new AppError('not authorized', 401));
  }
  if(!admin || !(await admin.correctPassword(password , admin.password))){
      return next(new AppError('incorrect email or password', 401));
  }
 createSendToken(admin, 200,res);
}); 
// verfiy token 
exports.protect = catchAsync(async (req, res, next) => {
    // 1)getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
    }else if (req.cookies.jwt){
      token = req.cookies.jwt;
      console.log(token)
    }
    if (!token) {
      return next(new AppError('you are not login pls login to get access', 401));
    }
    // 2) verification the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    // 3) check is user stil exist
    const currentUser = await User.findById(decoded.id);
    //console.log(currentUser);
    if (!currentUser) {
      return next(
        new AppError('the user belonging to this token deos no longer exist', 401)
      );
    }
    // 4) check the user change password after the token was issued
    /*if (freshUser.changePasswordAfter(decoded.iat)) {
      return next(new AppError('user recently change password', 401));
    }
    // pass data
    req.user = freshUser;
    next();*/
    req.user = currentUser;
    next();
  });

  exports.isLogIn = catchAsync(async (req, res, next) => {
    // 1)getting token and check of it's there
   if (req.cookies.jwt) {
    // 2) verification the token
    const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    //console.log(decoded);
    // 3) check is user stil exist
    const currentUser = await User.findById(decoded.id);
    //console.log(currentUser);
    if (!currentUser) {
      return next();
    }
    // 4) check the user change password after the token was issued
    /*if (freshUser.changePasswordAfter(decoded.iat)) {
      return next(new AppError('user recently change password', 401));
    }
    // pass data
    req.user = freshUser;
    next();*/
    //req.user = currentUser;
    res.locals.user= currentUser;
    next();
  }
  next();
  });
  exports.forgotPassword = catchAsync(async(req,res,next)=>{
    const user =await User.findOne({email:req.body.email});
    if(!user) {
        return next(new AppError("there is no user with email address",404));
    }
    //console.log(user);
    // generate rondom token
    const resetToken = user.createPasswordResetToken();
    //console.log(resetToken)
    await user.save({ validateBeforeSave: false });
    const restURL = `${req.protocol}://${req.get('host')}/api/user/resetpassword/${resetToken}`;
    //const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm <a href="">click here</a> to: ${restURL}.\nIf you didn't forget your password, please ignore this email!`;
    const message =  `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://127.0.0.1:5501/ONLINE-STORE/twon-team-clone/frontEnd/resetPass.html'> Click Here </a>`
    console.log(restURL)
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        htm:message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
        resetToken
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
    
});
exports.resetPassword = catchAsync(async (req,res,next)=>{
  // get the user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
    const user = await User.findOne(
      { 
        passwordResetToken: hashedToken,
        passwordResetExpires:{$gte:Date.now()}
      });
    console.log(user);
  // if the token is not expire and there is user reset password
  
  if(!user){
    return next(new AppError("token is invalid or expireed",400));
  }  
  // reset password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // log the user in , jwt
  createSendToken(user, 200,res);
});

exports.updatePassword = catchAsync(async (req,res,next)=>{
  const user = await User.findById(req.user.id).select('+password');
  if(!(user.correctPassword(req.body.passwordCurrent, user.password))){
       return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.save();
  createSendToken(user, 200,res);

});

exports.isAdmin = catchAsync(async(req,res,next)=>{
    const {email} = req.user;
    const admin = await User.findOne({email});
   // console.log(admin)
    if(admin.role !== 'Admin') {
        new AppError('you are not a Admin', 401);
    }
    next();
  });
exports.isSuberAdmin = catchAsync(async(req,res,next)=>{
    const {email} = req.user.email;
    const admin = await User.findOne({email});
    
    if(admin.role !== 'suberAdmin') {
        new AppError('you are not a Super Admin', 401);
    }
    next();
  });