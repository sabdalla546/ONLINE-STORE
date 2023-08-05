const mongoose = require('mongoose');
const AppError = require('./appError');

module.exports= id =>{
    isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) {
        throw new Error('this is id not valid');
    }
}