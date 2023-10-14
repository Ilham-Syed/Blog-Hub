const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogInSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, // Be sure to hash and salt passwords for security
});

const collection = new mongoose.model("Collection1", LogInSchema);
module.exports = collection;
