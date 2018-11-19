const express = require("express");

const router = express.Router();

const Parking = require("../models/parking"); // parking schema - has name, quantity and location

const getDropOff = (lat, long, radius) => {
  return Parking.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(long), parseFloat(lat)]
        },
        $maxDistance: radius
      }
    },
    quantity: { $gte: 1 } // whenever user parks the scooter we will always update the left capacity
    // of the parking location so in this query we will always left capacity
  });
};

router.get("/", (req, res, next) => {
  const { lat, long, distance } = req.query;

  return getDropOff(lat, long, distance)
    .then(result => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
