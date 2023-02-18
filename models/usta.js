const {Schema, model} = require("mongoose")

const ustaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  namePlace : {
    type: String,
    required: false
  },
  place: {
    type: String,
    required: false
  },
  targetPlace: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  startWork: {
    type: Number,
    required: true
  },
  endWork: {
    type: Number,
    required: true
  },
  timeToOne: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})

exports = model("usta", ustaSchema)