const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

exports = model("category", categorySchema)