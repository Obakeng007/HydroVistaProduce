const mongoose = require('mongoose');
const {Schema, model, Model} = require('mongoose');

const contactSchema = new Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  subject:{
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const contact = mongoose.model('contacts',contactSchema);
module.exports = contact;
