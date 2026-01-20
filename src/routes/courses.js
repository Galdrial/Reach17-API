const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
// ============================================
// CRUD ROUTES
// ============================================
/**
 * @route   POST /api/courses
 * @desc    Create a new course
 */
router.post('/', courseController.createCourse);
/**
 * @route   GET /api/courses
 * @desc    Get all courses (with optional filters)
 */
router.get('/', courseController.getCourses);
/**
 * @route   GET /api/courses/:id
 * @desc    Get single course by ID
 */
router.get('/:id', courseController.getCourseById);
/**
 * @route   PUT /api/courses/:id
 * @desc    Update course
 */
router.put('/:id', courseController.updateCourse);
/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course
 */
router.delete('/:id', courseController.deleteCourse);
// ============================================
// ASSOCIATION ROUTES
// ============================================
/**
 * @route   POST /api/courses/:courseId/universities/:universityId
 * @desc    Associate a university with a course
 */
router.post('/:courseId/universities/:universityId', 
  courseController.addUniversityToCourse
);
/**
 * @route   DELETE /api/courses/:courseId/universities/:universityId
 * @desc    Remove university association from course
 */
router.delete('/:courseId/universities/:universityId', 
  courseController.removeUniversityFromCourse
);
module.exports = router;