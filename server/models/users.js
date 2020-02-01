var mongoose = require('mongoose');

//create schema
var userSchema = mongoose.Schema({
    email: String,
    password:String,
    name: String,
    address: {country:String, city: String, state:String, street:String, zipCode:String},
    phone:String,
    notifications : [{creation_date:Date ,notification_text:String , is_read : Boolean }],
    status:String,
    photoUrl:String
});

module.exports = mongoose.model('User', userSchema);
