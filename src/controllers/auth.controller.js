import User from '../models/users.model.js';
import passport from  'passport';
import jwt from 'jsonwebtoken';

export const signin = (req,res) => {
  
};
export const signup = async (req, res) => {
  res.render('auth/signup');
};


  /*
passport.authenticate(
    'signup' , 
    {session : false}), 
    (req,res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
}
  */