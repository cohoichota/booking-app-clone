const express = require('express');

const router = express.Router();

const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const {
   createRoom,
   updateRoom,
   deleteRoom,
   getRoom,
   getAllRooms,
   availabilityRoom,
} = require('../controllers/rooms');

// create room
router.post('/:hotelId', verifyAdmin, createRoom);

// update room
router.put('/:id', verifyAdmin, updateRoom);

//update available id: RoomId
router.put('/availability/:id', availabilityRoom);

// delete room
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

// get room
router.get('/:id', getRoom);

// get all rooms
router.get('/', getAllRooms);

module.exports = router;
