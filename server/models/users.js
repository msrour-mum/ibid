const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');


//create schema
var userSchema = mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password:{type:String,required:[true, "can't be blank"]},
    name: {type:String,required:[true, "can't be blank"]},
    address: {city: String, state:String, street:String, zipCode:String},
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

userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.statics.isValid = function(password, hashedpassword){
    return  bcrypt.compareSync(password,hashedpassword);
}

userSchema.statics.findByEmail = async function(email) {
    return await this.findOne({email: email}).lean();
};

userSchema.plugin(uniqueValidator, {message: 'already exits'});
module.exports = mongoose.model('User', userSchema);
