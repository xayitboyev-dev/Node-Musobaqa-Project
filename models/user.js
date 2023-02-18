const {Schema, model} = require("mongoose")

const userSchema = new Schema({
  name: {
    type: String,
    reqiured: true
  },
  phone: {
    type: String,
    required: true
  }
})

exports = model("user", userSchema)