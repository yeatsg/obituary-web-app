const { Schema, model } = require("mongoose");

const obitSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "Smith",
  },
  causeOfDeath: {
    type: String,
  },
  floridaMan: {
    type: Boolean,
    default: false,
  },
  photoUrl: {
    type: String,
  },
});

const Obit = model("Obit", obitSchema);

module.exports = Obit;
