const mongoose = require('mongoose');
//const slugify= require('slugify');
const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required:[true, 'product must have title'],
        //trim: true
    },
   slug: String,
    description: {
        type: String,
        required:[true, 'product must have description'],
    },
    price: {
        type: Number,
        required: [true, 'product must have price'],
    },
    discount: {
       type:Number,
       
    },
    category: {
        type: String,
        required: [true, 'product must have category'],
    },
    quantity: {
        type: Number,
        required: [true, 'product must have quantity'],
    },
    images: {
        type:Array,
       
    },
   
     sold: {
      type: Number,
      default: 0,
      
    },
    color:{
       type: String,
       required: true
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
        type: String,
        default: 0,
      },
},{
    timestamps: true
});
productSchema.pre('save', function(next) {
   // this.slug = slugify(this.title, { lower: true });
    this.discount = this.price - this.price *0.2;
    next();
  });
const Product = mongoose.model('Product',productSchema);
module.exports = Product;
