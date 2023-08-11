const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userShema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'pls tell us your name']
    },
    email: {
      type: String,
      required: [true, 'pls provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'pls provide a valid email']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'super admin'],
        default: 'user'
      },
    password: {
      type: String,
      require: [true, 'pls provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      require: [true, 'pls provide a password'],
      validate: {
        // only work with create and save
        validator: function(el) {
          return el === this.password;
        },
        message: 'passwords are not the same'
      }
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    //passwordChangedAt: Date,
    active: {
      type:Boolean,
      default:true,
      select:false
    },
    isBlocked: {
      type:Boolean,
      default: false
    },
    card: {
      type: Array,
      default: [],
    },
    address: {
      type:String
    },
    wishList:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
  },
  {
    timestamps:true
  });

  userShema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    // hash a password with cost is 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });
  /*
  userShema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });*/
  userShema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });
  userShema.methods.correctPassword= async function (
    candidatePassword,
    userPassword) {
        return await bcrypt.compare(candidatePassword, userPassword);
    }
    userShema.methods.createPasswordResetToken = function() {
      const restToken = crypto.randomBytes(32).toString('hex');
      this.passwordResetToken = crypto
        .createHash('sha256')
        .update(restToken)
        .digest('hex');
      console.log({ restToken }, this.passwordResetToken);
      this.passwordResetExpires = Date.now() + (10 * 60 * 1000);
      return restToken;
    };
  const User = mongoose.model('user',userShema);

module.exports = User;  