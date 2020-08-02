const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema;

let model = null;

module.exports = function() {
  const schema = mongooseSchema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  })

  model = model ? model : mongoose.model('users', schema);

  return model;
}