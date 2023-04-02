const express = require('express');

const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

const {
   updateUser,
   deleteUser,
   getUser,
   getAllUsers,
} = require('../controllers/users');

// update user
router.put('/:id', verifyUser, updateUser);

// delete user
router.delete('/:id', verifyUser, deleteUser);

// get user
router.get('/:id', verifyUser, getUser);

// get all user
router.get('/', verifyAdmin, getAllUsers);

module.exports = router;
