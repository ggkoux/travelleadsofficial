const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

let emailvalidationChecker = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let usernamevalidationChecker = (username) => {
    const name = /^[A-Za-z]\w{2,16}$/;
    return name.test(username)
}

let passwordvalidationChecker = (password) => {
    const pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return pw.test(password);
}


const emailValidator = [{
    validator: emailvalidationChecker, message: 'a valid email address is required.'
}];

const usernameValidator = {
    validator: usernamevalidationChecker, message: 'username must start with a letter, the length of username should be 3 to 15 characters long, containing only characters, digits and underscore.'
};

const passwordValidator = {
    validator: passwordvalidationChecker, message: 'at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, length between 8 - 15 .'
};



const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidator},
    username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidator},
    password: {type: String, required: true, validate: passwordValidator},
  
});

userSchema.pre('save', function(next){
    if (!this.isModified('password')) 
        return next();
    
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) 
            return next(err);
        
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(this.password, password)
}

module.exports = mongoose.model('User', userSchema);