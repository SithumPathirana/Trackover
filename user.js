const mongoose=require('mongoose');

// Designing the user schema
const userSchema=mongoose.Schema({
    _id :mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    mobileNumber: String
});

module.exports=mongoose.model('User',userSchema);