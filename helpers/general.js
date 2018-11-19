const chance = require("chance")();
const randomLocation = require("random-location");

const Scooter = require("../models/scooter");
const Parking = require("../models/parking");

exports.populateScooters = () => {
  const singaporePoint = {
    latitude: process.env.LAT,
    longitude: process.env.LONG
  };
  const sgRadius = process.env.SG_RADIUS;

  const generateScooterData = () => ({
    name: chance.word(),
    location: {
      type: "Point",
      coordinates: []
    }
  });

  const scooterData = [];
  const count = process.env.DUMMY_DATA_COUNT;

  for (let i = 0; i < count; i += 1) {
    const scooterObj = generateScooterData();
    const { latitude, longitude } = randomLocation.randomCirclePoint(
      singaporePoint,
      sgRadius
    );
    scooterObj.location.coordinates.push(longitude, latitude);
    scooterData.push(scooterObj);
  }

  return Scooter.insertMany(scooterData);
};
