const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

exports.createRoom = async (req, res, next) => {
   const hotelId = req.params.hotelId;
   const newRoom = new Room(req.body);

   try {
      const savedRoom = await newRoom.save();

      try {
         await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
         });
         res.status(200).json(savedRoom);
      } catch (error) {
         next(error);
      }
   } catch (error) {
      next(error);
   }
};

exports.updateRoom = async (req, res, next) => {
   try {
      const updatedRoom = await Room.findByIdAndUpdate(
         req.params.id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(updatedRoom);
   } catch (error) {
      next(error);
   }
};

exports.deleteRoom = async (req, res, next) => {
   const hotelId = req.params.hotelId;
   try {
      await Room.findByIdAndDelete(req.params.id);

      try {
         await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
         });
      } catch (error) {
         next(error);
      }
      res.status(200).json('Room has been deleted');
   } catch (error) {
      next(error);
   }
};

exports.getRoom = async (req, res, next) => {
   try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
   } catch (error) {
      next(error);
   }
};

exports.getAllRooms = async (req, res, next) => {
   try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
   } catch (error) {
      next(error);
   }
};

exports.availabilityRoom = async (req, res, next) => {
   try {
      await Room.updateOne(
         { 'roomNumbers._id': req.params.id },
         {
            $push: {
               'roomNumbers.$.unavailableDates': req.body.dates,
            },
         }
      );
      res.status(200).json('Room status has been updated');
   } catch (error) {
      next(error);
   }
};
