const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  userId: {
    type: String,
    reqiured: true,
    unique: true
  },
  name: {
    type: String,
    reqiured: true
  },
  phone: {
    type: String,
    required: true
  },
});

module.exports = model("user", userSchema)