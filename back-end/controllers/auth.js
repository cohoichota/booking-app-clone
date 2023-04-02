const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { createError } = require('../utils/error');

exports.register = async (req, res, next) => {
   try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hash,
      });
      await newUser.save();
      res.status(201).json(newUser);
   } catch (error) {
      next(error);
   }
};

exports.login = async (req, res, next) => {
   try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
         return next(createError(404, 'User not found!'));
      }

      const isPasswordCorrect = await bcrypt.compare(
         req.body.password,
         user.password
      );

      if (!isPasswordCorrect) {
         return next(createError(400, 'Wrong password or username!'));
      }

      const token = jwt.sign(
         {
            id: user._id,
            isAdmin: user.isAdmin,
         },
         process.env.SECRET_KEY
      );

      const { password, isAdmin, ...other } = user._doc;
      res.cookie('access_token', token, {
         httpOnly: true,
      })
         .status(200)
         .json(other);
   } catch (error) {
      next(error);
   }
};
