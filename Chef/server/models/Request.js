const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id : String,
  status: Boolean,  
  type: String,
  fromTableId: String
});

module.exports = mongoose.model('Request', requestSchema);

