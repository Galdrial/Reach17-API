const University = require('../models/University'); 
/**
 * @desc    Create a new university
 * @route   POST /api/universities
 * @access  Public
 */
exports.createUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    const university = await University.create({ name });
    
    res.status(201).json({
      success: true,
      data: university
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A university with this name already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
  /**
 * @desc    Get all universities
 * @route   GET /api/universities
 * @access  Public
 */
exports.getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    
    res.status(200).json({
      success: true,
      count: universities.length,
      data: universities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Get single university by ID
 * @route   GET /api/universities/:id
 * @access  Public
 */
exports.getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        error: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: university
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Update university
 * @route   PUT /api/universities/:id
 * @access  Public
 */
exports.updateUniversity = async (req, res) => {
  try {
    const { name } = req.body;
    
    const university = await University.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    
    if (!university) {
      return res.status(404).json({
        success: false,
        error: 'University not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: university
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A university with this name already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
/**
 * @desc    Delete university
 * @route   DELETE /api/universities/:id
 * @access  Public
 */
exports.deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    
    if (!university) {
      return res.status(404).json({
        success: false,
        error: 'University not found'
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