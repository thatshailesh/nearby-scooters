const mongoose = require("mongoose");

const { Schema } = mongoose;

const transform = (doc, ret) => {
  delete ret.__v;
};

const StatusTypeEnum = {
  values: "working damaged".split(" "),
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`"
};

const transformJSON = (doc, ret) => {
  delete ret.__v;
  delete ret._id;
};

const ParkingSchema = new Schema(
  {
    name: { type: String, index: true, required: true, unique: true },
    location: {
      type: { type: String, enum: "Point", default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },
    quantity: { type: Number, require: true }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    toObject: {
      virtuals: true,
      transform
    },
    toJSON: {
      virtuals: true,
      transform: transformJSON
    }
  }
);

ParkingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Parking", ParkingSchema);
