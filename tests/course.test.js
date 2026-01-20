const request = require('supertest');
const app = require('../src/app');
const Course = require('../src/models/Course');
const CourseType = require('../src/models/CourseType');
const University = require('../src/models/University');
describe('Course API', () => {
  let courseType1, courseType2;
  let university1, university2;
  
  // Create test data before each test
  beforeEach(async () => {
    courseType1 = await CourseType.create({ name: 'Environmental' });
    courseType2 = await CourseType.create({ name: 'Social' });
    university1 = await University.create({ name: 'University of Bologna' });
    university2 = await University.create({ name: 'University of Milan' });
  });
  
  // ============================================
  // POST /api/courses
  // ============================================
  
  describe('POST /api/courses', () => {
    it('should create a new course with valid data', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({
          name: 'Climate Change Solutions',
          courseType: courseType1._id
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe('Climate Change Solutions');
      expect(res.body.data.courseType.toString()).toBe(courseType1._id.toString());
    });
    
    it('should reject course with missing name', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({ courseType: courseType1._id });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
    
    it('should reject course with missing courseType', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({ name: 'Climate Change Solutions' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should reject course with invalid courseType ID', async () => {
      const res = await request(app)
        .post('/api/courses')
        .send({
          name: 'Climate Change Solutions',
          courseType: 'invalid-id'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // GET /api/courses
  // ============================================
  
  describe('GET /api/courses', () => {
    it('should return empty array when no courses exist', async () => {
      const res = await request(app).get('/api/courses');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
    
    it('should return all courses with populated fields', async () => {
      await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id,
        universities: [university1._id]
      });
      await Course.create({
        name: 'Social Innovation',
        courseType: courseType2._id
      });
      
      const res = await request(app).get('/api/courses');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data[0].courseType).toHaveProperty('name');
      expect(res.body.data[0].universities).toBeDefined();
    });
    
    it('should filter courses by name', async () => {
      await Course.create({
        name: 'Climate Change Solutions',
        courseType: courseType1._id
      });
      await Course.create({
        name: 'Social Innovation',
        courseType: courseType2._id
      });
      
      const res = await request(app).get('/api/courses?name=climate');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].name).toContain('Climate');
    });
    
    it('should filter courses by courseType', async () => {
      await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id
      });
      await Course.create({
        name: 'Another Environmental Course',
        courseType: courseType1._id
      });
      await Course.create({
        name: 'Social Innovation',
        courseType: courseType2._id
      });
      
      const res = await request(app)
        .get(`/api/courses?courseType=${courseType1._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
    });
  });
  
  // ============================================
  // GET /api/courses/:id
  // ============================================
  
  describe('GET /api/courses/:id', () => {
    it('should return course by ID with populated fields', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id,
        universities: [university1._id, university2._id]
      });
      
      const res = await request(app).get(`/api/courses/${course._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Climate Change');
      expect(res.body.data.courseType).toHaveProperty('name');
      expect(res.body.data.universities).toHaveLength(2);
    });
    
    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app).get(`/api/courses/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // PUT /api/courses/:id
  // ============================================
  
  describe('PUT /api/courses/:id', () => {
    it('should update course with valid data', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id
      });
      
      const res = await request(app)
        .put(`/api/courses/${course._id}`)
        .send({
          name: 'Climate Action',
          courseType: courseType2._id
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Climate Action');
      expect(res.body.data.courseType._id).toBe(courseType2._id.toString());
    });
    
    it('should return 404 when updating non-existent course', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .put(`/api/courses/${fakeId}`)
        .send({
          name: 'Climate Action',
          courseType: courseType1._id
        });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // DELETE /api/courses/:id
  // ============================================
  
  describe('DELETE /api/courses/:id', () => {
    it('should delete course by ID', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id
      });
      
      const res = await request(app).delete(`/api/courses/${course._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      const deleted = await Course.findById(course._id);
      expect(deleted).toBeNull();
    });
    
    it('should return 404 when deleting non-existent course', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app).delete(`/api/courses/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // POST /api/courses/:courseId/universities/:universityId
  // ============================================
  
  describe('POST /api/courses/:courseId/universities/:universityId', () => {
    it('should add university to course', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id
      });
      
      const res = await request(app)
        .post(`/api/courses/${course._id}/universities/${university1._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.universities).toHaveLength(1);
      expect(res.body.data.universities[0]._id).toBe(university1._id.toString());
    });
    
    it('should reject adding same university twice', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id,
        universities: [university1._id]
      });
      
      const res = await request(app)
        .post(`/api/courses/${course._id}/universities/${university1._id}`);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('already associated');
    });
    
    it('should return 404 for non-existent course', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .post(`/api/courses/${fakeId}/universities/${university1._id}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // DELETE /api/courses/:courseId/universities/:universityId
  // ============================================
  
  describe('DELETE /api/courses/:courseId/universities/:universityId', () => {
    it('should remove university from course', async () => {
      const course = await Course.create({
        name: 'Climate Change',
        courseType: courseType1._id,
        universities: [university1._id, university2._id]
      });
      
      const res = await request(app)
        .delete(`/api/courses/${course._id}/universities/${university1._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.universities).toHaveLength(1);
      expect(res.body.data.universities[0]._id).toBe(university2._id.toString());
    });
    
    it('should return 404 for non-existent course', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/courses/${fakeId}/universities/${university1._id}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});