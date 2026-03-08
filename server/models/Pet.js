const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({

  name: String,
  breed: String,
  age: Number,
  diet: String,
  medicine: String,
  vetName: String,
  vetContact: String,

  image: String,   

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model("Pet", petSchema);