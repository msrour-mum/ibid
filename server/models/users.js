var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


//create schema
var userSchema = mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password:{type:String,required:[true, "can't be blank"]},
    name: {type:String,required:[true, "can't be blank"]},
    address: {country:String, city: String, state:String, street:String, zipCode:String},
    phone:String,
    notifications : [{creation_date:Date ,notification_text:String , is_read : Boolean }],
    status:{type:String, default:"Active"},
    photoUrl:String
},{
    timestamps: { 
        createdAt: 'creation_date',
        updatedAt: 'modification_date'
    }
});


userSchema.plugin(uniqueValidator, {message: 'already exits'});
module.exports = mongoose.model('User', userSchema);
