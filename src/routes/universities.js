const express = require('express');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { validateUniversity, validateId } = require('../middleware/validation');
/**
 * @route   POST /api/universities
 * @desc    Create a new university
 */
router.post('/', validateUniversity, universityController.createUniversity);
/**
 * @route   GET /api/universities
 * @desc    Get all universities
 */
router.get('/', universityController.getUniversities);
/**
 * @route   GET /api/universities/:id
 * @desc    Get single university by ID
 */
router.get('/:id',  validateId, universityController.getUniversityById);
/**
 * @route   PUT /api/universities/:id
 * @desc    Update university
 */
router.put('/:id', validateId, universityController.updateUniversity);
/**
 * @route   DELETE /api/universities/:id
 * @desc    Delete university
 */
router.delete('/:id', validateId, universityController.deleteUniversity);
module.exports = router;