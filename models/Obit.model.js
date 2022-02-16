const { Schema, model } = require("mongoose");

const obitSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    causeOfDeath: {
      type: String,
    },
    floridaMan: {
      type: Boolean,
      default: false,
    },
    floridaManSlug: {
      type: String,
      default: "",
    },
    photoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Obit = model("Obit", obitSchema);

module.exports = Obit;
