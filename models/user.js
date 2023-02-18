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
    type: [
      {
        time: {
          type: Date,
          required: true
        },
        worker: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "workers"
        }
      }
    ]
  }
})

exports = model("user", userSchema)