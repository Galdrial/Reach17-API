const mongoose = require('mongoose');
/**
 * University Schema
 * Represents an educational institution that offers courses
 */
const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must not exceed 100 characters']
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('University', universitySchema);