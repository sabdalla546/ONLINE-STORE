const mongoose = require('mongoose');
module.exports=async() =>{
    await mongoose.connect(process.env.DATABASE_conecction_string);
    console.log("mongo db connected successfully");
  } 