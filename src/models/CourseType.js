const mongoose = require('mongoose');

/**
 * CourseType Schema
 * Represents a category/type of course (e.g., Environmental Sustainability)
 */  
const courseTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course type name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must not exceed 100 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('CourseType', courseTypeSchema);
