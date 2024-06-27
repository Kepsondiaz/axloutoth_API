const mongoose = require('mongoose');

const CompteAReboursSchema = new mongoose.Schema({
    
  dateExamen: {
    type: Date,
    required: true,
  },
});

module.exports = {
  CompteAReboursSchema,
};

