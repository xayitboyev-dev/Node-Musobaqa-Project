const {Schema, model} = require("mongoose")

const userSchema = new Schema({
  name: {
    type: String,
    reqiured: true
  },
  phone: {
    type: String,
    required: true
  },
  queue: {
    type: [Schema.Types.ObjectId],
    ref: "workers",
    default: []
  }
})

exports = model("user", userSchema)