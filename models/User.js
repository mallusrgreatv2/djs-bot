const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  User: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  Karma: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  Money: {
    type: mongoose.SchemaTypes.Number,
    default: 500,
  },
});

module.exports = mongoose.model("User", userSchema);
