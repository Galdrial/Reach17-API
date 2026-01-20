const { body, param, validationResult } = require('express-validator');
/**
 * Middleware to check validation result
 * Must be used after validation rules
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};
// ============================================
// COURSE TYPE VALIDATION
// ============================================
/**
 * Validation rules for creating/updating course type
 */
exports.validateCourseType = [
  body('name')
    .trim()
    .notEmpty().withMessage('Course type name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .escape(),  // Sanitize input
  
  handleValidationErrors
];
/**
 * Validation for MongoDB ObjectId params
 */
exports.validateId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  handleValidationErrors
];
// ============================================
// UNIVERSITY VALIDATION
// ============================================
/**
 * Validation rules for creating/updating university
 */
exports.validateUniversity = [
  body('name')
    .trim()
    .notEmpty().withMessage('University name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .escape(),
  
  handleValidationErrors
];
// ============================================
// COURSE VALIDATION
// ============================================
/**
 * Validation rules for creating/updating course
 */
exports.validateCourse = [
  body('name')
    .trim()
    .notEmpty().withMessage('Course name is required')
    .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters')
    .escape(),
  
  body('courseType')
    .notEmpty().withMessage('Course type is required')
    .isMongoId().withMessage('Invalid course type ID format'),
  
  handleValidationErrors
];
/**
 * Validation for course-university association params
 */
exports.validateCourseUniversityParams = [
  param('courseId')
    .isMongoId().withMessage('Invalid course ID format'),
  
  param('universityId')
    .isMongoId().withMessage('Invalid university ID format'),
  
  handleValidationErrors
];