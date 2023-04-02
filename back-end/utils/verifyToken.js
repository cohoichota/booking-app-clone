const jwt = require('jsonwebtoken');
const { createError } = require('./error');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) {
      return next(createError(401, 'You are not authenticated!'));
   }

   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return next(createError(403, 'Token is not valid!'));
      req.user = user;
      next();
   });
};

exports.verifyUser = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) {
      return next(createError(401, 'You are not authenticated!'));
   }

   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return next(createError(403, 'Token is not valid!'));
      req.user = user;
   });

   if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
   } else {
      return next(createError(403, 'You are not authorized!'));
   }
};

exports.verifyAdmin = (req, res, next) => {
   const token = req.cookies.access_token;
   if (!token) {
      return next(createError(401, 'You are not authenticated!'));
   }

   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return next(createError(403, 'Token is not valid!'));
      req.user = user;
   });

   if (req.user.isAdmin) {
      next();
   } else {
      return next(createError(403, 'You are not authorized!'));
   }
};
