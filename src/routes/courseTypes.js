const express = require('express');
const router = express.Router();
const courseTypeController = require('../controllers/courseTypeController');
/**
 * @route   POST /api/course-types
 * @desc    Create a new course type
 */
router.post('/', courseTypeController.createCourseType);
/**
 * @route   GET /api/course-types
 * @desc    Get all course types
 */
router.get('/', courseTypeController.getCourseTypes);
/**
 * @route   GET /api/course-types/:id
 * @desc    Get single course type by ID
 */
router.get('/:id', courseTypeController.getCourseTypeById);
/**
 * @route   PUT /api/course-types/:id
 * @desc    Update course type
 */
router.put('/:id', courseTypeController.updateCourseType);
/**
 * @route   DELETE /api/course-types/:id
 * @desc    Delete course type
 */
router.delete('/:id', courseTypeController.deleteCourseType);
module.exports = router;