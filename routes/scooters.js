const express = require('express');

const router = express.Router();

const Scooter = require('../models/scooter')

/* GET users listing. */
router.get('/', (req, res, next) => {
  const { lat, long, distance } = req.query

  return Scooter.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(long), parseFloat(lat)],
        },
        $maxDistance: distance,
      },
    },
  })
    .then(result => {
      console.log('Resut ->> ', result.length)
      if (!result.length) return res.json()
      const features = []
      result.forEach(el => {
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: el.location.coordinates,
          },
          properties: {
            status: el.status,
          },
        });
      })
      const geoJsonData = {
        type: 'FeatureCollection',
        features,
      }
      res.json(geoJsonData)
    })
    .catch(next)
});

module.exports = router;
