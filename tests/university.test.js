const request = require('supertest');
const app = require('../src/app');
const University = require('../src/models/University');
describe('University API', () => {
  
  // ============================================
  // POST /api/universities
  // ============================================
  
  describe('POST /api/universities', () => {
    it('should create a new university with valid data', async () => {
      const res = await request(app)
        .post('/api/universities')
        .send({ name: 'University of Environmental Sustainability' });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.name).toBe('University of Environmental Sustainability');
    });
    
    it('should reject university with missing name', async () => {
      const res = await request(app)
        .post('/api/universities')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
    
    it('should reject university with name too short', async () => {
      const res = await request(app)
        .post('/api/universities')
        .send({ name: 'A' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
    
    it('should reject duplicate university name', async () => {
      // Create first
      await University.create({ name: 'University of Environmental Sustainability' });
      
      // Try to create duplicate
      const res = await request(app)
        .post('/api/universities')
        .send({ name: 'University of Environmental Sustainability' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('already exists');
    });
  });
  
  // ============================================
  // GET /api/universities
  // ============================================
  
  describe('GET /api/universities', () => {
    it('should return empty array when no universities exist', async () => {
      const res = await request(app).get('/api/universities');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toEqual([]);
    });
    
    it('should return all universities', async () => {
      // Create test data
      await University.create({ name: 'University of Environmental Sustainability' });
      await University.create({ name: 'University of Social Innovation' });
      
      const res = await request(app).get('/api/universities');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });
  });
  
  // ============================================
  // GET /api/universities/:id
  // ============================================
  
  describe('GET /api/universities/:id', () => {
    it('should return university by ID', async () => {
      const university = await University.create({ 
        name: 'University of Environmental Sustainability' 
      });
      
      const res = await request(app)
        .get(`/api/universities/${university._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('University of Environmental Sustainability');
    });
    
    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';  // Valid ObjectId format
      
      const res = await request(app)
        .get(`/api/universities/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    it('should return 400 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/universities/invalid-id');
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
  });
  
  // ============================================
  // PUT /api/universities/:id
  // ============================================
  
  describe('PUT /api/universities/:id', () => {
    it('should update university with valid data', async () => {
      const university = await University.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .put(`/api/universities/${university._id}`)
        .send({ name: 'Climate Action' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Climate Action');
    });
    
    it('should return 404 when updating non-existent university', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .put(`/api/universities/${fakeId}`)
        .send({ name: 'Climate Action' });
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
    
    it('should reject update with invalid data', async () => {
      const university = await University.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .put(`/api/universities/${university._id}`)
        .send({ name: 'A' });  // Too short
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  // ============================================
  // DELETE /api/universities/:id
  // ============================================
  
  describe('DELETE /api/universities/:id', () => {
    it('should delete university by ID', async () => {
      const university = await University.create({ 
        name: 'Environmental Sustainability' 
      });
      
      const res = await request(app)
        .delete(`/api/universities/${university._id}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      
      // Verify it's deleted
      const deleted = await University.findById(university._id);
      expect(deleted).toBeNull();
    });
    
    it('should return 404 when deleting non-existent university', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const res = await request(app)
        .delete(`/api/universities/${fakeId}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});