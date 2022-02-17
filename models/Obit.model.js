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
    floridaManURL: {
      type: String,
      default: "",
    },
    photoUrl: {
      type: String,
    },
    accomplishments: {
      type: String,
      default:
        "... Well I'm sure they accomplished something in their years, but we weren't able to find anything.",
    },
  },
  { timestamps: true }
);

const Obit = model("Obit", obitSchema);

module.exports = Obit;
