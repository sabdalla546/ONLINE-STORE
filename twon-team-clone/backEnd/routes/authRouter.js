const express = require('express');

const authController = require('../controller/authControllrt');
const userController = require('../controller/userController');
const router = express.Router();
const passport = require('passport');


router.post('/register',authController.signUp);
router.post('/login',authController.login);
router.post('/loginAdmin',authController.loginAdmin);
router.post('/forgotpassword',authController.forgotPassword);
// login by google
router.get('/google',passport.authenticate('google',{
    scope:['profile'],
    state: true
}))

router.patch('/resetpassword/:token',authController.resetPassword);
router.patch('/updateMyPassword',authController.protect,authController.updatePassword);

router.patch('/updateMe', authController.protect,userController.updateMe)
router.delete('/deletMe', authController.protect,userController.deleteMe);

router. 
    route('/').get(authController.protect,userController.getAllUsers);
router.get('/wishList',authController.protect,userController.getWishList);
router.put('/saveAddress',authController.protect,userController.saveAddress);

router.post('/cart',authController.protect,userController.userCart)

router.
    route('/:id').get(authController.protect,authController.isAdmin,userController.getSingleUser)
                 .delete(userController.deleteUser)
                 .put(authController.protect,authController.isAdmin,userController.updateUser);
router.put('/block-user/:id',authController.protect,authController.isAdmin,userController.blockUser);
router.put('/unblock-user/:id',authController.protect,authController.isAdmin,userController.unBlokUser);
module.exports = router;