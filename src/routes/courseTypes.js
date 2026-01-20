const express = require('express');
const router = express.Router();
const courseTypeController = require('../controllers/courseTypeController');
const { validateCourseType, validateId } = require('../middleware/validation');
/**
 * @route   POST /api/course-types
 * @desc    Create a new course type
 */
router.post('/', validateCourseType, courseTypeController.createCourseType);
/**
 * @route   GET /api/course-types
 * @desc    Get all course types
 */
router.get('/', courseTypeController.getCourseTypes);
/**
 * @route   GET /api/course-types/:id
 * @desc    Get single course type by ID
 */
router.get('/:id', validateId, courseTypeController.getCourseTypeById);
/**
 * @route   PUT /api/course-types/:id
 * @desc    Update course type
 */
router.put('/:id', validateId, courseTypeController.updateCourseType);
/**
 * @route   DELETE /api/course-types/:id
 * @desc    Delete course type
 */
router.delete('/:id', validateId, courseTypeController.deleteCourseType);
module.exports = router;