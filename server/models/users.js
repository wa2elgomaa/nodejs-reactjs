let mongoose = require('mongoose');
const crypto = require('crypto');
let mongooseSchema = mongoose.Schema;

// services 
const auth = require("../services/authService");

let userSchema = new mongooseSchema({
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String },
    accessToken: { type: String, default: "" },
    salt: { type: String }
});

userSchema.methods.encryptPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: auth.generateJWT(this),
    };
};

module.exports = mongoose.model('User', userSchema);
