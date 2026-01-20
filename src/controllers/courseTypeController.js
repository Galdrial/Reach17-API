const CourseType = require('../models/CourseType');
/**
 * @desc    Create a new course type
 * @route   POST /api/course-types
 * @access  Public
 */
exports.createCourseType = async (req, res) => {
  try {
    const { name } = req.body;
    const courseType = await CourseType.create({ name });
    
    res.status(201).json({
      success: true,
      data: courseType
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A course type with this name already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Get all course types
 * @route   GET /api/course-types
 * @access  Public
 */
exports.getCourseTypes = async (req, res) => {
  try {
    const courseTypes = await CourseType.find();
    
    res.status(200).json({
      success: true,
      count: courseTypes.length,
      data: courseTypes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Get single course type by ID
 * @route   GET /api/course-types/:id
 * @access  Public
 */
exports.getCourseTypeById = async (req, res) => {
  try {
    const courseType = await CourseType.findById(req.params.id);
    
    if (!courseType) {
      return res.status(404).json({
        success: false,
        error: 'Course type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: courseType
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Update course type
 * @route   PUT /api/course-types/:id
 * @access  Public
 */
exports.updateCourseType = async (req, res) => {
  try {
    const { name } = req.body;
    
    const courseType = await CourseType.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    
    if (!courseType) {
      return res.status(404).json({
        success: false,
        error: 'Course type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: courseType
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A course type with this name already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Delete course type
 * @route   DELETE /api/course-types/:id
 * @access  Public
 */
exports.deleteCourseType = async (req, res) => {
  try {
    const courseType = await CourseType.findByIdAndDelete(req.params.id);
    
    if (!courseType) {
      return res.status(404).json({
        success: false,
        error: 'Course type not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};