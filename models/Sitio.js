const { Schema, model, Number } = require("mongoose");

const SitioSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  counter: {
    type: Number
  }
});

module.exports = model("Sitio", SitioSchema);
