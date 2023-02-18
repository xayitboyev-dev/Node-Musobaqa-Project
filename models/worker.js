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
  namePlace: {
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
    type: Date,
    required: true
  },
  timeToOne: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  queue: {
    type: [
      {
        time: {
          type: Date,
          required: true
        },
        worker: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "users"
        }
      }
    ]
  },
  role: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

exports = model("worker", workerSchema)