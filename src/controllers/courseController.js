const Course = require('../models/Course');
/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Public
 */
exports.createCourse = async (req, res) => {
  try {
    const { name, courseType } = req.body;
    const course = await Course.create({ name, courseType });
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Get all courses (with optional filters)
 * @route   GET /api/courses?name=...&courseType=...
 * @access  Public
 */
exports.getCourses = async (req, res) => {
  try {
    const { name, courseType } = req.query;
    
    // Build filter object
    let filter = {};
    if (name) {
      filter.name = new RegExp(name, 'i');  // Case-insensitive search
    }
    if (courseType) {
      filter.courseType = courseType;
    }
    
    const courses = await Course.find(filter)
      .populate('courseType')      // Populate course type details
      .populate('universities');   // Populate universities details
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('courseType')
      .populate('universities');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Update course
 * @route   PUT /api/courses/:id
 * @access  Public
 */
exports.updateCourse = async (req, res) => {
  try {
    const { name, courseType } = req.body;
    
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, courseType },
      { new: true, runValidators: true }
    ).populate('courseType').populate('universities');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Delete course
 * @route   DELETE /api/courses/:id
 * @access  Public
 */
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
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
/**
 * @desc    Add university to course
 * @route   POST /api/courses/:courseId/universities/:universityId
 * @access  Public
 */
exports.addUniversityToCourse = async (req, res) => {
  try {
    const { courseId, universityId } = req.params;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Check if university is already associated
    if (course.universities.includes(universityId)) {
      return res.status(400).json({
        success: false,
        error: 'University already associated with this course'
      });
    }
    
    // Add university to array
    course.universities.push(universityId);
    await course.save();
    
    // Populate before sending response
    await course.populate('courseType');
    await course.populate('universities');
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Remove university from course
 * @route   DELETE /api/courses/:courseId/universities/:universityId
 * @access  Public
 */
exports.removeUniversityFromCourse = async (req, res) => {
  try {
    const { courseId, universityId } = req.params;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    // Remove university from array
    course.universities = course.universities.filter(
      id => id.toString() !== universityId
    );
    await course.save();
    
    // Populate before sending response
    await course.populate('courseType');
    await course.populate('universities');
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};