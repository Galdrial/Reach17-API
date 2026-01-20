const request = require('supertest');
const app = require('../src/app');
const CourseType = require('../src/models/CourseType');
describe('CourseType API', () => {
  
  // ============================================
  // POST /api/course-types
  // ============================================
  
  describe('POST /api/course-types', () => {
    it('should create a new course type with valid data', async () => {
      const res = await request(app)
        .post('/api/course-types')
        .send({ name: 'Environmental Sustainability' });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe('Environmental Sustainability');
    });
    
    it('should reject course type with missing name', async () => {
      const res = await request(app)
        .post('/api/course-types')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
    
    it('should reject course type with name too short', async () => {
      const res = await request(app)
        .post('/api/course-types')
        .send({ name: 'A' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should reject duplicate course type name', async () => {
      // Create first
      await CourseType.create({ name: 'Environmental Sustainability' });
      
      // Try to create duplicate
      const res = await request(app)
        .post('/api/course-types')
        .send({ name: 'Environmental Sustainability' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('already exists');
    });
  });
  
  // ============================================
  // GET /api/course-types
  // ============================================
  
  describe('GET /api/course-types', () => {
    it('should return empty array when no course types exist', async () => {
      const res = await request(app).get('/api/course-types');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
    
    it('should return all course types', async () => {
      // Create test data
      await CourseType.create({ name: 'Environmental Sustainability' });
      await CourseType.create({ name: 'Social Innovation' });
      
      const res = await request(app).get('/api/course-types');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });
  });
  
  // ============================================
  // GET /api/course-types/:id
  // ============================================
  
  describe('GET /api/course-types/:id', () => {
    it('should return course type by ID', async () => {
      const courseType = await CourseType.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .get(`/api/course-types/${courseType._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Environmental Sustainability');
    });
    
    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';  // Valid ObjectId format
      
      const res = await request(app)
        .get(`/api/course-types/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/course-types/invalid-id');
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  // ============================================
  // PUT /api/course-types/:id
  // ============================================
  
  describe('PUT /api/course-types/:id', () => {
    it('should update course type with valid data', async () => {
      const courseType = await CourseType.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .put(`/api/course-types/${courseType._id}`)
        .send({ name: 'Climate Action' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Climate Action');
    });
    
    it('should return 404 when updating non-existent course type', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .put(`/api/course-types/${fakeId}`)
        .send({ name: 'Climate Action' });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    it('should reject update with invalid data', async () => {
      const courseType = await CourseType.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .put(`/api/course-types/${courseType._id}`)
        .send({ name: 'A' });  // Too short
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // DELETE /api/course-types/:id
  // ============================================
  
  describe('DELETE /api/course-types/:id', () => {
    it('should delete course type by ID', async () => {
      const courseType = await CourseType.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .delete(`/api/course-types/${courseType._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      // Verify it's deleted
      const deleted = await CourseType.findById(courseType._id);
      expect(deleted).toBeNull();
    });
    
    it('should return 404 when deleting non-existent course type', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/course-types/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});