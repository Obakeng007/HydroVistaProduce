const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const userSchema = new Schema ({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  postalAddress: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true
})

const user = mongoose.model('User', userSchema  );

module.exports = user;
