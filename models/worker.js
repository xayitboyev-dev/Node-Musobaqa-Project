const { Schema, model } = require("mongoose")

const workerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: false
  },
  officeName: {
    type: String,
  },
  targetPlace: {
    type: String,
    required: false
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
  },
  startWork: {
    type: String,
    required: true
  },
  endWork: {
    type: String,
    required: true
  },
  timeToOne: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = model("worker", workerSchema)