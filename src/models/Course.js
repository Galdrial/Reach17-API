const mongoose = require('mongoose');
/**
 * Course Schema
 * Represents an educational course with type and associated universities
 */
const courseSchema = new mongoose.Schema({
  // Simple field: course name
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [200, 'Name must not exceed 200 characters']
  },
  
  // One-to-Many relationship with CourseType
  courseType: {
    type: mongoose.Schema.Types.ObjectId,  // Type: ObjectId
    ref: 'CourseType',                     // Reference to CourseType model
    required: [true, 'Course type is required']
  },
  
  // Many-to-Many relationship with University
  universities: [{                         // Array of ObjectIds
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University'                      // Reference to University model
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model('Course', courseSchema);