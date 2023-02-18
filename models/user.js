const {Schema, model} = require("mongoose")

const userSchema = new Schema({
  user_id: {
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
  queue: {
    type: [Schema.Types.ObjectId],
    ref: "workers",
    default: []
  }
})

exports = model("user", userSchema)