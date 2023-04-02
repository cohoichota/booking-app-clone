const express = require('express');

const router = express.Router();

const { verifyUser, verifyAdmin } = require('../utils/verifyToken');

const {
   createHotel,
   updateHotel,
   deleteHotel,
   getHotel,
   getAllHotels,
   getHotelsCountByCity,
   getHotelsCountByType,
   getHotelRooms,
} = require('../controllers/hotels');

// create
router.post('/', verifyAdmin, createHotel);

// update
router.put('/:id', verifyAdmin, updateHotel);

// delete
router.delete('/find/:id', verifyAdmin, deleteHotel);

// get
router.get('/find/:id', getHotel);

// get all hotel ?featured=&limit=4
router.get('/', getAllHotels);

// get hotels by city ?cities=berlin,madrid,london
router.get('/countByCity', getHotelsCountByCity);

// get hotels by type
router.get('/countByType', getHotelsCountByType);

// get room id: hotelId
router.get('/room/:id', getHotelRooms);

module.exports = router;
