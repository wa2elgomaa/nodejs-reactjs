
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secretKey = "iotblue";

const auth = {
  required: expressjwt({
    secret: secretKey,
    userProperty: 'payload',
    getToken: this.getTokenFromHeaders,
  }),
  optional: expressjwt({
    secret: secretKey,
    userProperty: 'payload',
    getToken: this.getTokenFromHeaders,
    credentialsRequired: false,
  }),
  getTokenFromHeaders : (req) => {
    const { headers: { authorization } } = req;
    if(authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization.split(' ')[1];
      return token;
    }
    return null;
  },
  generateJWT: (user) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: user.email,
        id: user._id,
        isAdmin : user.isAdmin,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, secretKey);
  },
  parseJWT : (token) => {
    if(token){
      const decoded = jwt.decode(token, {complete: true});
      return decoded;
    }
    return null;
  }
};

module.exports = auth;