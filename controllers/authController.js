const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, save) => {
    if(error) {
      return res.status(400).json({
        message: "Please check fields, there was an Error"
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
}

exports.signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}, (error, user) => {
    if(error || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
      });
    }
    // if user found make sure the email and password match create authenticate method in user model
    if(!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password don\'t match'
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiration date
    res.cookie('t', token, {expire: new Date() + 9999});
    // return response with user and token to frontend client
    const {_id, name, email, role} = user;
    return res.json(
      {
        token,
        user: {
          _id,
          email,
          name,
          role
        }
      }
    );
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: 'Signout success'});
}

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  })
}